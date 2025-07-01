
import { useState } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Teacher {
  id: number;
  name: string;
  major: string;
  experience: string;
  specialties: string[];
  image: string;
  education?: string;
  career?: string[];
  greeting?: string;
}

interface TeacherSliderProps {
  teachers: Teacher[];
  onTeacherClick: (teacher: Teacher) => void;
}

const TeacherSlider = ({ teachers, onTeacherClick }: TeacherSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teachers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
  };

  if (teachers.length === 0) return null;

  const currentTeacher = teachers[currentIndex];

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* 선생님 사진 - 더 크게 */}
            <div className="flex-shrink-0">
              <img 
                src={currentTeacher.image} 
                alt={currentTeacher.name}
                className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl object-cover shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>

            {/* 선생님 정보 */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {currentTeacher.name} 선생님
              </h3>
              <p className="text-xl text-gray-600 mb-4">{currentTeacher.major}</p>
              
              <div className="flex items-center justify-center lg:justify-start text-lg text-gray-500 mb-6">
                <Award className="w-5 h-5 mr-2" />
                <span>경력 {currentTeacher.experience}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {currentTeacher.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-sm px-3 py-1">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              <Button 
                onClick={() => onTeacherClick(currentTeacher)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                선생님 상세정보
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 네비게이션 버튼 */}
      {teachers.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* 인디케이터 */}
          <div className="flex justify-center mt-4 gap-2">
            {teachers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherSlider;
