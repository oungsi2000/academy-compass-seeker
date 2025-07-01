
import { Star, MapPin, Users, Phone, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Academy } from "@/data/mockData";
import { Link } from "react-router-dom";

interface AcademyCardProps {
  academy: Academy;
}

const AcademyCard = ({ academy }: AcademyCardProps) => {
  return (
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
          <Link 
            to={`/academy/${academy.id}`}
            className="block mb-3"
          >
            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight">
              {academy.name}
            </h3>
          </Link>

          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
            {academy.description}
          </p>

          {/* 모바일 위치 및 정보 */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span className="truncate">{academy.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Users className="w-4 h-4 mr-2 text-green-500" />
                <span>수강생 {academy.studentCount}명</span>
              </div>
              <div className="flex items-center text-gray-500">
                <DollarSign className="w-4 h-4 mr-1 text-emerald-500" />
                <span className="font-medium">{(academy.registrationFee || 300000).toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 모바일 과목 태그 */}
          <div className="flex flex-wrap gap-1 mb-4">
            {academy.subjects.slice(0, 3).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs px-2 py-1 rounded-full">
                {subject}
              </Badge>
            ))}
            {academy.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 rounded-full">
                +{academy.subjects.length - 3}
              </Badge>
            )}
          </div>

          {/* 모바일 액션 버튼 */}
          <div className="flex gap-2">
            <Link to={`/academy/${academy.id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl border-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                상세 정보
              </Button>
            </Link>
            <Button 
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open(`tel:${academy.phone}`)}
            >
              <Phone className="w-4 h-4 mr-2" />
              문의
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademyCard;
