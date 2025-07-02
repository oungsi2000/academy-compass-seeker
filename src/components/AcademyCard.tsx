
import { Star, MapPin, Users, Phone, MessageCircle, Gift, Target, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Academy } from "@/data/mockData";
import { Link } from "react-router-dom";

interface AcademyCardProps {
  academy: Academy;
}

const AcademyCard = ({ academy }: AcademyCardProps) => {
  // 거리 계산 (임시 데이터)
  const distance = `${(Math.random() * 5 + 0.5).toFixed(1)}km`;
  
  // 학원 특징 (추가 데이터)
  const features = ["레벨테스트", "맛보기 강의", "개별 상담"];
  const strengths = ["소수정예", "1:1 맞춤", "실력향상"];
  
  return (
    <Link to={`/academy/${academy.id}`} className="block">
      <Card className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 animate-fade-in">
        <CardContent className="p-0">
          {/* 모바일 최적화 학원 이미지 */}
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
            <img 
              src={academy.image} 
              alt={academy.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-bold text-gray-900">{academy.rating}</span>
            </div>
          </div>

          {/* 모바일 학원 정보 */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {academy.name}
            </h3>

            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
              {academy.description}
            </p>

            {/* 위치 정보 - 정확한 주소와 거리 */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm truncate">{academy.address}</span>
              </div>
              <div className="flex items-center text-gray-500 text-xs ml-6">
                <Target className="w-3 h-3 mr-1" />
                <span>현재 위치에서 {distance}</span>
              </div>
            </div>

            {/* 수강생 및 등록비 정보 - 범위로 표시 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm">{academy.studentCount}명 수강 중</span>
              </div>
              <div className="text-sm font-bold text-blue-600">
                {(academy.registrationFee - 50000).toLocaleString()}원 ~ {(academy.registrationFee + 50000).toLocaleString()}원
              </div>
            </div>

            {/* 과목 태그 + 강점 태그 */}
            <div className="flex flex-wrap gap-1 mb-3">
              {academy.subjects.slice(0, 2).map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
              {strengths.slice(0, 2).map((strength) => (
                <Badge key={strength} variant="outline" className="text-xs border-purple-200 text-purple-700">
                  {strength}
                </Badge>
              ))}
            </div>

            {/* 학원 특징 */}
            <div className="flex flex-wrap gap-2 mb-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3 mr-1" />
                  {feature}
                </div>
              ))}
            </div>

            {/* 이벤트 정보 */}
            {academy.events.length > 0 && (
              <div className="mb-4 p-2 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center text-red-600 text-xs">
                  <Gift className="w-3 h-3 mr-1" />
                  <span className="font-medium">{academy.events[0]}</span>
                </div>
              </div>
            )}

            {/* 액션 버튼들 - 아이콘 버튼으로 변경 */}
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="p-2 rounded-xl"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`tel:${academy.phone}`);
                }}
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="p-2 rounded-xl"
                onClick={(e) => {
                  e.preventDefault();
                  // 채팅 문의 로직
                }}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AcademyCard;
