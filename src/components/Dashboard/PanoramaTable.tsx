import React, {
    useEffect,
    useState
} from "react"
import {
    Row,
    Col,
    Card,
    Button,
    Space,
    Tag,
    Input,
    Switch,
    Modal,
    Upload,
    message,
} from "antd"
import {
    DeleteOutlined,
    EyeOutlined,
    FolderOpenOutlined,
    StarFilled,
    StarOutlined
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { Breakpoint as AntdBreakpoint } from "antd/es/_util/responsiveObserver"
import type { RcFile } from 'antd/es/upload'
import Datatable from "components/ui/Datatable"
import useApi from "hooks/useApi"

type Item = {
    key: number;
    name: string;
    filename: string;
    mimeType: string;
    size: string;
    bookmarked: boolean;
    isActive: boolean;
    createdAt: string;
}

export default function PanoramaTable() {
    // search and bookmark controls
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [debouncedQuery, setDebouncedQuery] = useState<string>("")
    const [bookmarkedOnly, setBookmarkedOnly] = useState<boolean>(false)

    // upload modal state
    const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState<boolean>(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(6)

    // debounce search input
    useEffect(() => {
        const t = window.setTimeout(() => setDebouncedQuery(searchQuery.trim()), 400)
        return () => window.clearTimeout(t)
    }, [searchQuery])

    // reset to first page on query/filter change
    useEffect(() => {
        setPage(1)
    }, [debouncedQuery, bookmarkedOnly])

    // build query string from debounced query and bookmarked flag
    const query = new URLSearchParams()
    if (debouncedQuery) query.set('q', debouncedQuery)
    if (bookmarkedOnly) query.set('bookmarked', 'true')
    query.set('page', String(page))
    query.set('limit', String(limit))

    // fetch data
    const { data, loading, refetch } = useApi<{ total: number; items: Item[] }>(`/api/panoramas?${query.toString()}`)

    // table columns
    const columns: ColumnsType<Item> = [
        { title: "Name", dataIndex: "name", key: "name",},
        { title: "Status", dataIndex: "isActive", key: "isActive",  responsive: ["sm"] as AntdBreakpoint[],
            render: (isActive: boolean): JSX.Element => {
                const color = isActive ? "green" : "default"
                return <Tag color={color}>{isActive ? "ACTIVE" : "INACTIVE"}</Tag>
            }
        },
        { title: "Filetype", dataIndex: "mimeType", key: "mimeType", responsive: ["md"] as AntdBreakpoint[] },
        { title: "File Size", dataIndex: "size", key: "size", responsive: ["md"] as AntdBreakpoint[] },
        { title: "Date", dataIndex: "createdAt", key: "createdAt", responsive: ["lg"] as AntdBreakpoint[] },
        {
            title: "Action",
            key: "action",
            align: "right",
            render: (_text: unknown, record: Item): JSX.Element => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => window.open(`/panorama-viewer?name=${encodeURIComponent(record.name)}`, "_blank")}
                    />
                    <Button
                        variant="link"
                        icon={record.bookmarked ? <StarFilled /> : <StarOutlined />}
                        color="gold"
                        onClick={async () => {
                            try {
                                const res = await fetch(`http://localhost:3001/api/panoramas/${record.name}/bookmark`, { method: 'POST' })
                                if (!res.ok) throw new Error('Bookmark toggle failed')
                                await refetch()
                            } catch (err) {
                                console.error('Failed to toggle bookmark', err)
                            }
                        }}
                    />
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => null}
                    />
                </Space>
            ),
        },
    ]

    // pagination handler
    const onTableChange = (pagination: { current?: number; pageSize?: number }) => {
        if (pagination?.current) setPage(pagination.current)
        if (pagination?.pageSize) setLimit(pagination.pageSize)
    }

    // upload helpers
    const beforeUpload = (file: RcFile) => {
        setSelectedFile(file as File)
        return false // prevent auto upload
    }

    // handle upload
    const handleUpload = async () => {
        if (!selectedFile) {
            message.error('Please select a file to upload')
            return
        }

        const formData = new FormData()
        formData.append('image', selectedFile)

        setUploading(true)
        try {
            const res = await fetch('http://localhost:3001/api/panoramas/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) throw new Error('Upload failed')
            message.success('Upload successful')
            setUploadModalVisible(false)
            setSelectedFile(null)
            // refresh list
            try { await refetch() } catch {}
        } catch (err) {
            console.error(err)
            message.error('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <Row style={{ marginTop: 16 }}>
            <Col xs={24}>
                <Card title="Panorama images">
                    <Space style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }} align="center">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Input.Search
                                placeholder="Search name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onSearch={(v) => setDebouncedQuery(v.trim())}
                                allowClear
                                style={{ maxWidth: 360, width: '100%' }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Switch checked={bookmarkedOnly} onChange={(v) => setBookmarkedOnly(v)} />
                                <span>Filter bookmarked</span>
                            </div>
                        </div>
                        <Space style={{ marginLeft: 12, whiteSpace: 'nowrap' }}>
                            <Button type="primary" onClick={() => setUploadModalVisible(true)}>Upload</Button>
                        </Space>
                    </Space>

                    <Modal
                        title="Upload panorama"
                        open={uploadModalVisible}
                        onOk={handleUpload}
                        onCancel={() => { setUploadModalVisible(false); setSelectedFile(null) }}
                        okButtonProps={{ loading: uploading }}
                    >
                        <Upload.Dragger beforeUpload={beforeUpload} multiple={false} showUploadList={false} accept="image/*">
                            <FolderOpenOutlined />
                            <p className="ant-upload-text">Drag & drop an image here, or click to select</p>
                        </Upload.Dragger>
                        {selectedFile && <div style={{ marginTop: 12 }}>Selected: {selectedFile.name}</div>}
                    </Modal>

                    <Datatable
                        columns={columns}
                        data={data?.items ?? []}
                        loading={loading}
                        pagination={{
                            current: page,
                            pageSize: limit,
                            total: data?.total ?? 0,
                        }}
                        onChange={onTableChange}
                    />
                </Card>
            </Col>
        </Row>
    )
}
