
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  academyName: string;
}

const ReportDialog = ({ isOpen, onClose, academyName }: ReportDialogProps) => {
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast({
        title: "신고 사유를 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "신고가 접수되었습니다",
      description: "검토 후 조치하겠습니다. 감사합니다."
    });
    
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            학원 신고하기
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              신고 대상: <span className="font-medium">{academyName}</span>
            </p>
            <p className="text-sm text-gray-500">
              허위 정보나 부적절한 내용에 대해 신고해주세요.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              신고 사유
            </label>
            <Textarea
              placeholder="신고 사유를 자세히 입력해주세요..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-red-600 hover:bg-red-700">
              신고하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
