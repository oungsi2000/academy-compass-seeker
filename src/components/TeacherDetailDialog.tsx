
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, MessageSquare } from "lucide-react";

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

interface TeacherDetailDialogProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
}

const TeacherDetailDialog = ({ teacher, isOpen, onClose }: TeacherDetailDialogProps) => {
  if (!teacher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {teacher.name} 선생님
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 선생님 기본 정보 */}
          <div className="flex items-start gap-6">
            <img 
              src={teacher.image}
              alt={teacher.name}
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {teacher.name} 선생님
              </h3>
              <p className="text-gray-600 mb-3">{teacher.major}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Award className="w-4 h-4 mr-2" />
                <span>경력 {teacher.experience}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacher.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* 학력 */}
          <div className="space-y-3">
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
              <h4 className="text-lg font-semibold">학력</h4>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {teacher.education || "서울대학교 국어국문학과 졸업\n고려대학교 교육대학원 국어교육학 석사"}
            </p>
          </div>

          {/* 경력 */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-green-600" />
              <h4 className="text-lg font-semibold">주요 경력</h4>
            </div>
            <ul className="space-y-2 text-gray-700">
              {(teacher.career || [
                "대치동 메가스터디 국어과 대표강사 (5년)",
                "EBS 수능특강 국어영역 집필진",
                "전국 모의고사 출제위원",
                "다수 학생 SKY 합격 지도"
              ]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 인사말 */}
          <div className="space-y-3">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
              <h4 className="text-lg font-semibold">인사말</h4>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {teacher.greeting || `안녕하세요, ${teacher.name} 선생님입니다. 학생 한 명 한 명의 성장을 위해 최선을 다하겠습니다. 국어는 단순히 암기하는 과목이 아닙니다. 체계적이고 논리적인 접근을 통해 학생들이 국어의 진정한 재미를 느낄 수 있도록 지도하겠습니다.`}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherDetailDialog;
