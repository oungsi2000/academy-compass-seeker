
import { Star, MapPin, Users, Phone } from "lucide-react";
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
    <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 학원 이미지 */}
          <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <img 
              src={academy.image} 
              alt={academy.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* 학원 정보 */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <Link 
                to={`/academy/${academy.id}`}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {academy.name}
              </Link>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm font-medium text-gray-700">
                  {academy.rating}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2">
              {academy.description}
            </p>

            <div className="flex items-center text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{academy.location}</span>
              <Users className="w-4 h-4 ml-4 mr-1" />
              <span className="text-sm">수강생 {academy.studentCount}명</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {academy.subjects.slice(0, 4).map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
              {academy.subjects.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{academy.subjects.length - 4}개
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
              <Link to={`/academy/${academy.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  상세 정보
                </Button>
              </Link>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open(`tel:${academy.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                문의하기
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademyCard;
