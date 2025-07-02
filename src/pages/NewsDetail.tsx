import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Share2, Bookmark } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAdmissionNews } from "@/data/mockData";

const NewsDetail = () => {
  const { newsId } = useParams();
  const news = mockAdmissionNews.find(n => n.id === Number(newsId));

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">뉴스를 찾을 수 없습니다</h1>
          <Link to="/feed" className="text-blue-600 hover:underline">
            피드로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 모의 뉴스 내용 생성
  const fullContent = `
    ${news.summary}
    
    교육부는 이번 발표를 통해 학생들과 학부모들이 미리 준비할 수 있도록 충분한 정보를 제공하고자 한다고 밝혔습니다.
    
    주요 변경사항으로는 다음과 같습니다:
    
    1. 출제 방향의 명확화
    - 교육과정과의 연계성 강화
    - 실생활 문제해결 능력 평가 확대
    - 융합적 사고력 측정 문항 증가
    
    2. 평가 방식 개선
    - 선택형과 서술형의 균형있는 구성
    - 단순 암기보다는 이해와 적용 중심
    - 창의적 사고를 요구하는 문항 확대
    
    3. 출제 범위 조정
    - 핵심 개념 중심의 출제
    - 과도한 계산이나 암기 부담 완화
    - 교과서 중심의 문제 출제 강화
    
    이러한 변화는 학생들이 단순 암기가 아닌 진정한 학습을 통해 대학 진학을 준비할 수 있도록 돕는 것을 목표로 합니다.
    
    전문가들은 이번 변화가 학생들에게 긍정적인 영향을 미칠 것으로 전망하고 있으며, 학원가에서도 이러한 변화에 맞춘 교육과정 개편을 준비하고 있습니다.
    
    자세한 내용은 교육부 공식 홈페이지에서 확인할 수 있으며, 각 시도교육청에서도 추가적인 안내를 제공할 예정입니다.
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/feed" className="flex items-center text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">피드로 돌아가기</span>
          </Link>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="p-2">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 뉴스 내용 */}
      <div className="px-4 py-6">
        <article className="bg-white rounded-2xl shadow-lg p-6">
          {/* 뉴스 헤더 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {news.category}
              </Badge>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {news.date}
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
              {news.title}
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {news.summary}
            </p>
          </div>

          {/* 뉴스 본문 */}
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {fullContent}
            </div>
          </div>

          {/* 관련 태그 */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-3">관련 태그</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{news.category}</Badge>
              <Badge variant="outline">교육정책</Badge>
              <Badge variant="outline">입시제도</Badge>
              <Badge variant="outline">수험생</Badge>
            </div>
          </div>
        </article>

        {/* 관련 뉴스 */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">관련 뉴스</h2>
          <div className="space-y-3">
            {mockAdmissionNews
              .filter(item => item.id !== news.id && item.category === news.category)
              .slice(0, 3)
              .map((relatedNews) => (
                <Link
                  key={relatedNews.id}
                  to={`/news/${relatedNews.id}`}
                  className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs">
                      {relatedNews.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{relatedNews.date}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {relatedNews.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedNews.summary}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;