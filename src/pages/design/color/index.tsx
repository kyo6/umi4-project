import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Button, Input, Card, Row, Col, message, Modal, Form, Space, Tag, Popconfirm } from 'antd';
import { CopyOutlined, PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import './style.less';

// 预设颜色配置
const defaultColors = {
    theme: [
        '#5070dd',
        '#b6d634',
        '#505372',
        '#ff994d',
        '#0ca8df',
        '#ffd10a',
        '#fb628b',
        '#785db0',
        '#3fbe95'
    ],

    neutral00: '#fff',
    neutral05: '#f4f7fd',
    neutral10: '#e8ebf0',
    neutral15: '#dbdee4',
    neutral20: '#cfd2d7',
    neutral25: '#c3c5cb',
    neutral30: '#b7b9be',
    neutral35: '#aaacb2',
    neutral40: '#9ea0a5',
    neutral45: '#929399',
    neutral50: '#86878c',
    neutral55: '#797b7f',
    neutral60: '#6d6e73',
    neutral65: '#616266',
    neutral70: '#54555a',
    neutral75: '#48494d',
    neutral80: '#3c3c41',
    neutral85: '#303034',
    neutral90: '#232328',
    neutral95: '#17171b',
    neutral99: '#000',

    accent05: '#eff1f9',
    accent10: '#e0e4f2',
    accent15: '#d0d6ec',
    accent20: '#c0c9e6',
    accent25: '#b1bbdf',
    accent30: '#a1aed9',
    accent35: '#91a0d3',
    accent40: '#8292cc',
    accent45: '#7285c6',
    accent50: '#6578ba',
    accent55: '#5c6da9',
    accent60: '#536298',
    accent65: '#4a5787',
    accent70: '#404c76',
    accent75: '#374165',
    accent80: '#2e3654',
    accent85: '#252b43',
    accent90: '#1b2032',
    accent95: '#121521',

    transparent: 'rgba(0,0,0,0)',
    highlight: 'rgba(255,231,130,0.8)'
};

interface ColorItem {
    id: string;
    name: string;
    value: string;
    category: string;
    createdAt: string;
}

const Colors: React.FC = () => {
    const [colors, setColors] = useState<ColorItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingColor, setEditingColor] = useState<ColorItem | null>(null);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // 转换默认颜色为ColorItem格式
    const convertDefaultColors = (defaultColors: any): ColorItem[] => {
        const colorItems: ColorItem[] = [];

        Object.entries(defaultColors).forEach(([key, value]) => {
            if (key === 'theme' && Array.isArray(value)) {
                value.forEach((color: string, index: number) => {
                    colorItems.push({
                        id: `theme-${index}`,
                        name: `主题色 ${index + 1}`,
                        value: color,
                        category: 'theme',
                        createdAt: new Date().toISOString()
                    });
                });
            } else if (typeof value === 'string') {
                colorItems.push({
                    id: key,
                    name: key,
                    value: value as string,
                    category: key.startsWith('neutral') ? 'neutral' :
                        key.startsWith('accent') ? 'accent' : 'other',
                    createdAt: new Date().toISOString()
                });
            }
        });

        return colorItems;
    };


    // 初始化颜色数据
    useEffect(() => {
        const savedColors = localStorage.getItem('colorCollection');
        if (savedColors) {
            setColors(JSON.parse(savedColors));
        } else {
            // 将默认颜色转换为ColorItem格式
            const initialColors = convertDefaultColors(defaultColors);
            console.log(initialColors);
            setColors(initialColors);
            localStorage.setItem('colorCollection', JSON.stringify(initialColors));
        }
    }, []);


    // 保存颜色到本地存储
    const saveColors = useCallback((newColors: ColorItem[]) => {
        setColors(newColors);
        localStorage.setItem('colorCollection', JSON.stringify(newColors));
    }, []);

    // 复制颜色到剪贴板
    const copyToClipboard = useCallback(async (colorValue: string) => {
        try {
            await navigator.clipboard.writeText(colorValue);
            message.success(`颜色值 ${colorValue} 已复制到剪贴板`);
        } catch (err) {
            message.error('复制失败');
        }
    }, []);

    // 添加或编辑颜色
    const handleAddColor = () => {
        form.validateFields().then(values => {
            const newColor: ColorItem = {
                id: editingColor?.id || `color-${Date.now()}`,
                name: values.name,
                value: values.value,
                category: values.category || 'custom',
                createdAt: editingColor?.createdAt || new Date().toISOString()
            };

            let newColors;
            if (editingColor) {
                newColors = colors.map(color =>
                    color.id === editingColor.id ? newColor : color
                );
                message.success('颜色已更新');
            } else {
                newColors = [...colors, newColor];
                message.success('颜色已添加');
            }

            saveColors(newColors);
            setIsModalVisible(false);
            setEditingColor(null);
            form.resetFields();
        });
    };

    // 删除颜色
    const handleDeleteColor = (id: string) => {
        const newColors = colors.filter(color => color.id !== id);
        saveColors(newColors);
        message.success('颜色已删除');
    };

    // 编辑颜色
    const handleEditColor = (color: ColorItem) => {
        setEditingColor(color);
        form.setFieldsValue({
            name: color.name,
            value: color.value,
            category: color.category
        });
        setIsModalVisible(true);
    };

    // 显示添加颜色模态框
    const showAddModal = () => {
        setEditingColor(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    // 过滤颜色
    const filteredColors = colors.filter(color => {
        const matchesSearch = color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            color.value.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || color.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // 获取所有分类
    const categories = ['all', ...Array.from(new Set(colors.map(color => color.category)))];

    // 判断文字颜色
    const getTextColor = (backgroundColor: string) => {
        if (backgroundColor === 'transparent' || backgroundColor.includes('rgba(0,0,0,0)')) {
            return '#000';
        }

        const hex = backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000' : '#fff';
    };

    return (
        <div className="colors-collection">
            <div className="colors-header">
                <h1>颜色收藏工具</h1>
                <p>管理和收藏你喜欢的颜色</p>
            </div>

            <div className="colors-controls">
                <Space size="middle" wrap>
                    <Input.Search
                        placeholder="搜索颜色名称或值"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 200 }}
                    />

                    <div className="category-filters">
                        {categories.map(category => (
                            <Tag.CheckableTag
                                key={category}
                                checked={selectedCategory === category}
                                onChange={() => setSelectedCategory(category)}
                            >
                                {category === 'all' ? '全部' : category}
                            </Tag.CheckableTag>
                        ))}
                    </div>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                    >
                        添加颜色
                    </Button>
                </Space>
            </div>

            <div className="colors-grid">
                <Row gutter={[16, 16]}>
                    {filteredColors.map((color) => (
                        <Col key={color.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Card
                                className="color-card"
                                hoverable
                                actions={[
                                    <Button
                                        key="copy"
                                        type="text"
                                        icon={<CopyOutlined />}
                                        onClick={() => copyToClipboard(color.value)}
                                        title="复制颜色值"
                                    />,
                                    <Button
                                        key="edit"
                                        type="text"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEditColor(color)}
                                        title="编辑颜色"
                                    />,
                                    <Popconfirm
                                        key="delete"
                                        title="确定删除这个颜色吗？"
                                        onConfirm={() => handleDeleteColor(color.id)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            danger
                                            title="删除颜色"
                                        />
                                    </Popconfirm>
                                ]}
                            >
                                <div className="color-content">
                                    <div
                                        className="color-preview"
                                        style={{
                                            backgroundColor: color.value,
                                            color: getTextColor(color.value)
                                        }}
                                        onClick={() => copyToClipboard(color.value)}
                                    >
                                        {color.value === 'transparent' || color.value.includes('rgba(0,0,0,0)') ? (
                                            <div className="transparent-pattern">
                                                <EyeOutlined />
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="color-info">
                                        <h4 className="color-name">{color.name}</h4>
                                        <p className="color-value">{color.value}</p>
                                        <Tag>{color.category}</Tag>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {filteredColors.length === 0 && (
                <div className="empty-state">
                    <p>没有找到匹配的颜色</p>
                </div>
            )}

            <Modal
                title={editingColor ? "编辑颜色" : "添加颜色"}
                open={isModalVisible}
                onOk={handleAddColor}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingColor(null);
                    form.resetFields();
                }}
                okText="确定"
                cancelText="取消"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="颜色名称"
                        name="name"
                        rules={[{ required: true, message: '请输入颜色名称' }]}
                    >
                        <Input placeholder="输入颜色名称" />
                    </Form.Item>

                    <Form.Item
                        label="颜色值"
                        name="value"
                        rules={[{ required: true, message: '请输入颜色值' }]}
                    >
                        <Input
                            type="color"
                            placeholder="输入颜色值 (如: #5070dd)"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item label="分类" name="category">
                        <Input placeholder="输入分类 (如: custom)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Colors;

