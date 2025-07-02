
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
          {/* 학원 정보와 사진 */}
          <div className="flex">
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-2">
                  <Badge variant={academy.type === "단과" ? "default" : "secondary"} className="text-xs">
                    {academy.type}
                  </Badge>
                  {academy.categories.slice(0, 2).map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-bold text-gray-900">{academy.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                {academy.name}
              </h3>

              <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
                {academy.description}
              </p>

              {/* 위치 정보 */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm truncate">{academy.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs ml-6">
                  <Users className="w-3 h-3 mr-1 text-green-500" />
                  <span>{academy.studentCount}명 수강 중</span>
                </div>
              </div>

              {/* 등록비 정보 */}
              <div className="text-sm font-bold text-blue-600 mb-3">
                {(academy.registrationFee - 50000).toLocaleString()}원 ~ {(academy.registrationFee + 50000).toLocaleString()}원
              </div>

              {/* 액션 버튼들 */}
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
                  className="px-3 py-2 rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    // 채팅 페이지로 이동
                    window.location.href = `/chat/${academy.id}`;
                  }}
                >
                  학원 채팅으로 문의
                </Button>
              </div>
            </div>
            
            {/* 오른쪽 정사각형 사진 */}
            <div className="w-24 h-24 m-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl overflow-hidden flex-shrink-0">
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
          </div>

        </CardContent>
      </Card>
    </Link>
  );
};

export default AcademyCard;
