
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "홈", path: "/" },
    { name: "학원 찾기", path: "/academies" },
    { name: "어디다녀 피드", path: "/feed" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50 animate-slide-down">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          {/* 모바일 최적화 로고 */}
          <Link to="/" className="flex items-center space-x-2 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
            </div>
            <span className="text-xl font-bold">
              어디<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">다녀</span>
            </span>
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 animate-spin" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 모바일 전체화면 메뉴 */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-white z-40 animate-slide-in-right">
            <nav className="flex flex-col h-full pt-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-6 py-6 text-lg font-medium transition-all duration-300 border-b border-gray-100 ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50 border-l-4 border-l-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="animate-fade-in">{item.name}</div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
