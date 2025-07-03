import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAcademies } from "@/data/mockData";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  isUser: boolean;
}

const Chat = () => {
  const { academyId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "안녕하세요! 강남 엘리트 국어학원입니다. 문의사항이 있으시면 언제든지 말씀해주세요!",
      timestamp: "오후 2:30",
      isUser: false
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const academy = mockAcademies.find(a => a.id === Number(academyId));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isUser: true
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      // 자동 응답 시뮬레이션
      setTimeout(() => {
        const autoReply: Message = {
          id: Date.now() + 1,
          content: "네, 문의해주셔서 감사합니다. 곧 담당자가 답변드리겠습니다!",
          timestamp: new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          isUser: false
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };

  if (!academy) {
    return <div>학원을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      {/* 채팅 헤더 */}
      <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/academies" className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <img
              src={academy.image}
              alt={academy.name}
              className="w-10 h-10 rounded-full mr-3"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div>
              <h1 className="font-semibold text-gray-900">{academy.name}</h1>
              <p className="text-sm text-green-500">온라인</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Phone className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border shadow-sm'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력 영역 */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 rounded-full border-gray-300"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="rounded-full bg-blue-500 hover:bg-blue-600 p-3"
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;