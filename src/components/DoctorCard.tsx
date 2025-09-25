import React from "react";
import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
interface DoctorCardProps {
  id: string;
  name: string;
  specialization: string;
  experience?: string;
  image?: string;
  testimonial?: string;
  availableFrom?: string;
  workingHours?: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  showChooseButton?: boolean;
  className?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  specialization,
  experience,
  image,
  testimonial,
  availableFrom,
  workingHours,
  isSelected = false,
  onSelect,
  showChooseButton = true,
  className = "",
}) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
      );
    }
    return stars;
  };

  return (
    <Card
      className={`
        relative transition-all duration-300 hover:shadow-lg cursor-pointer
        ${isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"}
        ${className}
      `}
      onClick={handleSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {name}
              </h3>
              <p className="text-sm text-gray-600">{specialization}</p>
              {experience && (
                <p className="text-xs text-gray-500 mt-1">{experience}</p>
              )}
            </div>

            <div className="flex items-center space-x-1 mb-3">
              {renderStars()}
            </div>

            {testimonial && (
              <div className="mb-4">
                <p
                  className="text-sm text-gray-600 italic overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  "{testimonial}"
                </p>
              </div>
            )}

            {(availableFrom || workingHours) && (
              <div className="space-y-1 mb-4 text-sm">
                {availableFrom && (
                  <p className="text-gray-600">
                    <span className="text-gray-500">Available from:</span>{" "}
                    <span className="font-medium text-primary">
                      {availableFrom}
                    </span>
                  </p>
                )}
                {workingHours && (
                  <p className="text-gray-600">
                    <span className="text-gray-500">Working hours:</span>{" "}
                    <span className="font-medium">{workingHours}</span>
                  </p>
                )}
              </div>
            )}

            {showChooseButton && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-gray-300 bg-white hover:border-primary"
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">
                    Choose
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
