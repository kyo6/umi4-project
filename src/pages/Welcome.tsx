// This implementation includes:

// A responsive grid layout that adapts to different screen sizes
// Card components with hover effects
// Proper spacing and typography matching the screenshot
// Icons from Lucide that closely match the original design
// Color-coded icons and backgrounds for different tool categories
// Header with navigation and action buttons
// Proper content structure with title and description
// Interactive elements with hover states
// Clean and organized code structure following the Container/Presentational pattern
// The component is fully responsive and will adjust from 1 column on mobile to 4 columns on larger screens. Each card has a subtle hover effect and maintains consistent spacing and alignment. The implementation uses Tailwind's utility classes for styling and maintains the exact look and feel of the original design.

import { Settings, Share2, Image, FileImage, Type, Palette, MessageSquare, Video, MessageCircle, FileText, Calendar, FileDown, Users, Lock, Globe, Edit } from 'lucide-react';

// Container Component
export default function AIToolboxContainer() {
  const tools = [
    {
      id: 1,
      icon: <Image className="w-6 h-6 text-pink-500" />,
      title: "智谱AI图片生成",
      description: "使用智谱AI的CogView-3模型生成高质量图片。",
      bgColor: "bg-pink-50",
    },
    {
      id: 2,
      icon: <FileImage className="w-6 h-6 text-blue-500" />,
      title: "Flux AI 图片生成",
      description: "使用 FLUX.1-schnell 模型生成图片，4秒快速成图。",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      icon: <Image className="w-6 h-6 text-purple-500" />,
      title: "Stable Diffusion",
      description: "使用 SD 系列模型，支持生成高高级功能。",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      icon: <FileText className="w-6 h-6 text-green-500" />,
      title: "图片提示词分析",
      description: "智能分析图片内容，生成专业的描述和关键词。",
      bgColor: "bg-green-50",
    },
    {
      id: 5,
      icon: <Type className="w-6 h-6 text-teal-500" />,
      title: "图标生成器",
      description: "一键生成各种平台所需的应用图标。",
      bgColor: "bg-teal-50",
    },
    {
      id: 6,
      icon: <Palette className="w-6 h-6 text-yellow-500" />,
      title: "调色板生成器",
      description: "从图片中提取配色方案，生成和谐的色彩组合。",
      bgColor: "bg-yellow-50",
    },
    {
      id: 7,
      icon: <MessageSquare className="w-6 h-6 text-cyan-500" />,
      title: "卡片生成器",
      description: "生成精美的社交媒体分享卡片，支持多种模板样式。",
      bgColor: "bg-cyan-50",
    },
    {
      id: 8,
      icon: <Video className="w-6 h-6 text-violet-500" />,
      title: "视频生成器",
      description: "将图片和文字转换为精美视频，支持多种格式。",
      bgColor: "bg-violet-50",
    },
    {
      id: 9,
      icon: <MessageCircle className="w-6 h-6 text-pink-500" />,
      title: "小红书文案生成",
      description: "智能生成吸引人的小红书文案，自动添加标签。",
      bgColor: "bg-pink-50",
    },
    {
      id: 10,
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      title: "日报周报生成",
      description: "智能生成工作日报和周报，让汇报更专业高效。",
      bgColor: "bg-blue-50",
    },
    {
      id: 11,
      icon: <FileDown className="w-6 h-6 text-teal-500" />,
      title: "Markdown 转换器",
      description: "一键转换 Markdown 为多种格式，支持批量处理。",
      bgColor: "bg-teal-50",
    },
    {
      id: 12,
      icon: <Users className="w-6 h-6 text-pink-500" />,
      title: "朋友圈文案生成",
      description: "智能生成朋友圈文案，自动添加表情和标签。",
      bgColor: "bg-pink-50",
    },
    {
      id: 13,
      icon: <Lock className="w-6 h-6 text-purple-500" />,
      title: "加密语言转换器",
      description: "将文本转换为特殊的加密中文，只有懂中文的人才能理解。",
      bgColor: "bg-purple-50",
    },
    {
      id: 14,
      icon: <Globe className="w-6 h-6 text-green-500" />,
      title: "网页内容阅读大师",
      description: "AI多维度解析网页内容，快速掌握核心要点。",
      bgColor: "bg-green-50",
    },
    {
      id: 15,
      icon: <Edit className="w-6 h-6 text-pink-500" />,
      title: "小红书批量改写",
      description: "支持多种输入方式，一键生成多种风格的小红书文案，包含读书笔记、干货分享等专业模式。",
      bgColor: "bg-pink-50",
    },
  ];

  return <AIToolbox tools={tools} />;
}

// UI Component
function AIToolbox({ tools }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Image className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">AILong 智能工具箱</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-blue-600 hover:text-blue-700">更多AI工具</button>
            <Share2 className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
          </div>
        </header>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">AILong AI工具箱</h1>
          <p className="text-gray-600 mb-4">
            以下工具旨在学习AI大模型的使用，探索通过AI编程开发各种实用工具，让创作更轻松，提升个人工作效率和生产力✨
          </p>
          <p className="text-blue-600">
            <a href="#" className="hover:underline">访问 AI1.xin</a>
            <span className="mx-2">，</span>
            <a href="#" className="hover:underline">获取更多AI产品及学习经验</a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4`}>
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                开始使用 →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}