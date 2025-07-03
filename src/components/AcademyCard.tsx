
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
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm rounded-xl overflow-hidden animate-fade-in">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* 왼쪽 이미지 */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={academy.image} 
                alt={academy.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            
            {/* 메인 콘텐츠 */}
            <div className="flex-1 min-w-0">
              {/* 헤더 섹션 */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <Badge variant={academy.type === "단과" ? "default" : "secondary"} className="text-xs px-2 py-0.5">
                      {academy.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {academy.categories[0]}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                    {academy.name}
                  </h3>
                </div>
                <div className="flex items-center bg-yellow-50 rounded-full px-2 py-1 ml-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs font-bold text-gray-900">{academy.rating}</span>
                </div>
              </div>

              {/* 정보 섹션 */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-3 h-3 mr-1 text-blue-600" />
                    <span className="truncate">{academy.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 ml-2">
                    <Users className="w-3 h-3 mr-1 text-green-500" />
                    <span>{academy.studentCount}명</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-blue-600">
                  {(academy.registrationFee - 50000).toLocaleString()}원 ~ {(academy.registrationFee + 50000).toLocaleString()}원
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="px-3 py-1.5 text-xs rounded-lg flex-1"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`tel:${academy.phone}`);
                  }}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  전화
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="px-3 py-1.5 text-xs rounded-lg flex-1"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/chat/${academy.id}`;
                  }}
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  문의
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AcademyCard;
