// components/PhotoStrip.tsx
import Image from "next/image";
import { getLayoutInfo } from "@/utils/layoutUtils";
import { useState } from "react";
import { Plus } from "lucide-react";
import { HexColorPicker } from "react-colorful";

interface PhotoStripProps {
  captures: string[];
  layout?: string;
  onFilterChange?: (filter: string) => void;
  onBackgroundChange?: (bg: { color: string; isImage: boolean }) => void;
  showTimestamp: boolean;
  onTimestampChange: (show: boolean) => void;
}

const CustomColorPicker = ({
  isOpen,
  onClose,
  color,
  onChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  color: string;
  onChange: (color: string) => void;
}) => {
  const [hexInput, setHexInput] = useState(color);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();

    // Remove any existing '#' to standardize the input
    value = value.replace("#", "");

    // Limit to 6 characters (excluding #)
    value = value.slice(0, 6);

    // Add '#' back if it's not there
    if (!value.startsWith("#")) {
      value = "#" + value;
    }

    setHexInput(value);

    // Validate the hex code (now checking without the #)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-72">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-[#444041]">Custom Color</h3>
            <button
              onClick={onClose}
              className="text-[#444041]/60 hover:text-[#444041] transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="custom-color-picker">
            <HexColorPicker
              color={color}
              onChange={onChange}
              style={{ width: "100%" }}
            />
          </div>

          <div className="flex gap-2 items-center">
            <div
              className="w-10 h-10 rounded-md border border-[#444041]/20"
              style={{ backgroundColor: color }}
            />
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              placeholder="RRGGBB"
              className="flex-1 px-3 py-2 border border-[#444041]/20 rounded-md
                         focus:outline-none focus:border-[#899786] focus:ring-1 focus:ring-[#899786]
                         font-mono uppercase"
            />
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 font-mono rounded-md text-sm transition-all
                     bg-[#385331]/50 text-white font-black
                     hover:scale-105"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const PhotoStrip = ({
  captures,
  layout,
  onFilterChange,
  onBackgroundChange,
  showTimestamp,
  onTimestampChange,
}: PhotoStripProps) => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [isImageBackground, setIsImageBackground] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const layoutInfo = getLayoutInfo(layout);
  const requiredShots = layoutInfo.shots;
  const [activeTab, setActiveTab] = useState("filters");
  const [customColor, setCustomColor] = useState("Enter Hex Code");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [customPattern, setCustomPattern] = useState<string | null>(null);

  const uniqueCaptures = [...new Set(captures)].slice(0, requiredShots);
  console.log("Unique captures:", {
    uniqueCount: uniqueCaptures.length,
    originalCount: captures.length,
    requiredShots,
    isEnough: uniqueCaptures.length === requiredShots,
  });

  const solidColorOptions = [
    {
      name: "Custom",
      value: customColor,
      isCustom: true,
      style: `before:absolute before:inset-0 before:rounded-xl before:-z-10
              before:bg-gradient-to-r before:from-pink-500 before:via-yellow-500
              before:to-blue-500 before:animate-gradient before:p-0.5`,
    },
    { name: "White", value: "#FFFFFF" },
    { name: "Soft Pink", value: "#FFE4E1" },
    { name: "Mint Green", value: "#E0F4E4" },
    { name: "Baby Blue", value: "#E6F3FF" },
    { name: "Lavender", value: "#E6E6FA" },
    { name: "Peach", value: "#FFDAB9" },
    { name: "Cream", value: "#FFFDD0" },
    { name: "Soft Black", value: "#2A2A2A" },
  ];

  const patternOptions = [
    {
      name: "Custom Pattern",
      value: "custom",
      isCustomUpload: true,
      customStyle: `before:absolute before:inset-0 before:rounded-xl before:-z-10
                   before:bg-gradient-to-r before:from-pink-500 before:via-yellow-500
                   before:to-blue-500 before:animate-gradient before:p-0.5`,
    },
    { name: "Pattern", value: "/bg/cinna.jpg", isImage: true },
    { name: "Pattern 1", value: "/bg/cinna1.jpg", isImage: true },
    { name: "Pattern 2", value: "/bg/cinna2.jpg", isImage: true },
    { name: "Pattern 3", value: "/bg/cinna3.jpg", isImage: true },
    { name: "Pattern 4", value: "/bg/cinna4.jpg", isImage: true },
    { name: "Pattern 5", value: "/bg/pattern.jpg", isImage: true },
    { name: "Pattern 6", value: "/bg/pattern1.jpg", isImage: true },
    { name: "Pattern 7", value: "/bg/pattern2.jpg", isImage: true },
    { name: "Pattern 8", value: "/bg/pattern3.jpg", isImage: true },
    { name: "Pattern 9", value: "/bg/pattern4.jpg", isImage: true },
    { name: "Pattern 10", value: "/bg/pattern5.jpg", isImage: true },
    { name: "Pattern 11", value: "/bg/pattern6.jpg", isImage: true },
    { name: "Pattern 12", value: "/bg/pattern7.jpg", isImage: true },
  ];

  // Filter options with preview values
  const filterOptions = [
    { name: "None", value: "none", style: "" },
    {
      name: "Vintage",
      value: "vintage",
      style:
        "sepia(0.35) contrast(1.1) brightness(1.2) saturate(1.3) hue-rotate(-10deg)",
    },
    {
      name: "Classic Film",
      value: "classicfilm",
      style: "contrast(1.2) brightness(1.1) saturate(1.1) sepia(0.22)",
    },
    {
      name: "Kodachrome",
      value: "kodachrome",
      style:
        "contrast(1.3) saturate(1.3) brightness(1.1) sepia(0.15) hue-rotate(-5deg)",
    },
    {
      name: "Polaroid",
      value: "polaroid",
      style:
        "sepia(0.15) contrast(1.25) brightness(1.15) saturate(0.9) hue-rotate(5deg)",
    },

    {
      name: "Faded",
      value: "faded",
      style: "opacity(0.85) saturate(0.75) contrast(1.1) brightness(1.15)",
    },
    {
      name: "Cinematic",
      value: "cinematic",
      style: "contrast(1.3) saturate(1.35) brightness(0.9) sepia(0.15)",
    },
    {
      name: "1960s",
      value: "sixties",
      style:
        "sepia(0.25) saturate(1.4) contrast(1.2) brightness(1.1) hue-rotate(-15deg)",
    },
    {
      name: "Cross Process",
      value: "xpro",
      style: "contrast(1.4) brightness(1.1) saturate(1.6) hue-rotate(5deg)",
    },
    {
      name: "Technicolor",
      value: "technicolor",
      style: "saturate(1.5) contrast(1.2) brightness(1.1) hue-rotate(-5deg)",
    },
    {
      name: "Noir",
      value: "noir",
      style: "grayscale(1) contrast(1.4) brightness(0.9) sepia(0.15)",
    },
    {
      name: "Lomo",
      value: "lomo",
      style:
        "saturate(1.4) contrast(1.3) brightness(0.95) sepia(0.2) hue-rotate(-5deg)",
    },
    {
      name: "Retro Matte",
      value: "retromatte",
      style: "contrast(1.15) brightness(1.1) saturate(0.9) sepia(0.15)",
    },
    {
      name: "Pastel",
      value: "pastel",
      style: "saturate(0.8) contrast(0.9) brightness(1.2) opacity(0.9)",
    },
    {
      name: "Inverted",
      value: "inverted",
      style: "invert(1)",
    },
    {
      name: "Neon",
      value: "neon",
      style: "brightness(1.2) contrast(1.4) saturate(1.8) hue-rotate(180deg)",
    },
    {
      name: "Duotone",
      value: "duotone",
      style: "grayscale(1) sepia(0.8) hue-rotate(140deg) saturate(1.5)",
    },
    {
      name: "Blueprint",
      value: "blueprint",
      style: "brightness(1.1) sepia(1) saturate(5) hue-rotate(180deg)",
    },
    {
      name: "X-Ray",
      value: "xray",
      style: "invert(0.8) brightness(1.2) contrast(1.4) sepia(0.3)",
    },
    {
      name: "Cyberpunk",
      value: "cyberpunk",
      style: "brightness(1.1) saturate(1.5) contrast(1.3) hue-rotate(220deg)",
    },
  ];

  // Get the current filter style
  const getCurrentFilter = () => {
    return filterOptions.find((f) => f.value === selectedFilter)?.style || "";
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange?.(
      filterOptions.find((f) => f.value === filter)?.style || ""
    );
  };

  const handleBackgroundSelect = (color: {
    value: string;
    isImage?: boolean;
  }) => {
    setSelectedColor(color.value);
    setIsImageBackground(!!color.isImage);
    onBackgroundChange?.({ color: color.value, isImage: !!color.isImage });
  };

  const handleCustomPatternUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPattern(event.target?.result as string);
        handleBackgroundSelect({
          value: event.target?.result as string,
          isImage: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add this CSS class to the button's className when rendering solid color options
  const rainbowBorderStyle = `
    before:absolute before:inset-0 before:rounded-xl before:-z-10
    before:bg-gradient-to-r before:from-pink-500 before:via-yellow-500
    before:to-blue-500 before:animate-gradient before:p-0.5
  `;

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start lg:justify-center">
        <div className="lg:w-full flex flex-col items-center lg:sticky lg:top-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#444041] mb-6 text-center tracking-tight">
            Customize Strip
          </h2>

          <div className="lg:w-1/2 flex justify-center lg:sticky lg:top-8">
            <div
              className={`p-6 border-8 border-[#444041] bg-white shadow-2xl rounded-sm
                       transform transition-all duration-300 hover:shadow-3xl
                       relative `}
              style={{
                backgroundColor: !isImageBackground ? selectedColor : undefined,
              }}
            >
              {isImageBackground && (
                <Image
                  src={selectedColor}
                  alt="Pattern background"
                  fill
                  className="object-cover"
                />
              )}
              <div className={`relative ${isImageBackground ? "z-10" : ""}`}>
                <div
                  className={`${
                    layout === "2A" ? "flex flex-row" : layoutInfo.gridLayout
                  } gap-3 ${
                    layout === "2A"
                      ? "w-full max-w-[500px] sm:w-[500px]"
                      : requiredShots >= 3
                      ? "w-48"
                      : "w-64"
                  }`}
                >
                  {uniqueCaptures.map((capture, index) => (
                    <div
                      key={`photo-${index}`}
                      className={`relative ${
                        layout === "2A"
                          ? "w-full max-w-[300px] aspect-square" // Responsive width with maintained aspect ratio
                          : ""
                      }`}
                    >
                      <Image
                        src={capture}
                        alt={`Photo ${index + 1}`}
                        width={layout === "2A" ? 300 : 256}
                        height={layout === "2A" ? 300 : 256}
                        className={`w-full h-full object-cover border-2 border-[#444041] bg-black ${
                          layout === "2A" ? "min-w-[150px]" : "" // Minimum width for mobile
                        }`}
                        style={{ filter: getCurrentFilter() }}
                      />
                      <div
                        className="flex items-center justify-center font-mono absolute bottom-2 right-2 bg-[#444041]/80 backdrop-blur-sm
                                px-1 rounded-full border border-white/20 shadow-lg"
                      >
                        <span className="text-[10px] font-medium text-white tracking-wider">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center bg-white rounded-sm border-2 border-[#444041]  px-4 py-2 m-0 mt-5 w-fit mx-auto ">
                  <div className="text-[#444041] text-4xl font-gloock tracking-tighter text-center font-bold ">
                    P<span className="text-[#385331]/50">i</span>t
                    <span className="text-[#385331]/50">i</span>k Strip
                  </div>
                  {showTimestamp && (
                    <div className="text-center text-[#7a7a7a] ">
                      {`${new Date()
                        .toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "2-digit",
                        })
                        .split("/")
                        .slice(0, 2)
                        .join(" ")} '${new Date()
                        .getFullYear()
                        .toString()
                        .slice(2)}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-100 mt-5">
          <div className="flex justify-center my-5">
            <button
              onClick={() => onTimestampChange(!showTimestamp)}
              className={`px-4 py-2 font-mono rounded-md text-sm transition-all
                      ${
                        showTimestamp
                          ? "bg-[#385331]/50 text-white font-black"
                          : "bg-white text-[#444041] border border-[#444041]"
                      }
                      hover:scale-105`}
            >
              {showTimestamp ? "Hide Timestamp" : "Show Timestamp"}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-[#444041]/20">
            <button
              onClick={() => setActiveTab("filters")}
              className={`flex-1 py-3 text-center font-medium transition-all
                ${
                  activeTab === "filters"
                    ? "text-[#385331] border-b-2 border-[#385331]"
                    : "text-[#444041]/60 hover:text-[#444041]"
                }`}
            >
              Filters
            </button>
            <button
              onClick={() => setActiveTab("background")}
              className={`flex-1 py-3 text-center font-medium transition-all
                ${
                  activeTab === "background"
                    ? "text-[#385331] border-b-2 border-[#385331]"
                    : "text-[#444041]/60 hover:text-[#444041]"
                }`}
            >
              Background
            </button>
          </div>

          {/* Filter Tab Content */}
          {activeTab === "filters" && (
            <div className="w-full animate-fadeIn">
              <p className="text-[#444041] mb-3 font-medium text-center">
                Choose Filter
              </p>
              <div className="grid grid-cols-2 gap-2 justify-center">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterSelect(filter.value)}
                    className={`px-4 py-2 font-mono rounded-md text-sm transition-all
                      ${
                        selectedFilter === filter.value
                          ? "bg-[#385331]/50 text-white font-black"
                          : "bg-white text-[#444041] border border-[#444041]"
                      }
                      hover:scale-105 whitespace-nowrap`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Background Tab Content */}
          {activeTab === "background" && (
            <div className="w-full animate-fadeIn">
              <div className="mb-6">
                <p className="text-[#444041] mb-4 font-medium text-center text-lg">
                  Solid Colors
                </p>
                <div className="flex gap-3 flex-wrap justify-center p-4 bg-[#444041]/5 rounded-xl">
                  {solidColorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        if (color.isCustom) {
                          setIsColorPickerOpen(true);
                        } else {
                          handleBackgroundSelect(color);
                        }
                      }}
                      className={`w-12 h-12 rounded-xl transition-all duration-200 overflow-hidden relative
                        ${
                          selectedColor === color.value
                            ? "border-2  ring-2 ring-[#444041] shadow-lg transform scale-105"
                            : "border  border-[#444041]/20 hover:border-[#444041]/40"
                        }
                        ${color.isCustom ? rainbowBorderStyle : ""}
                        hover:shadow-md hover:scale-105`}
                      title={color.isCustom ? "Pick custom color" : color.name}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: color.isCustom ? undefined : color.value,
                        }}
                      >
                        {color.isCustom && (
                          <Plus className="w-6 h-6 text-[#444041]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[#444041] mb-4 font-medium text-center text-lg">
                  Patterns
                </p>
                <div className="flex gap-3 flex-wrap justify-center p-4 bg-[#444041]/5 rounded-xl">
                  {patternOptions.map((pattern) =>
                    pattern.isCustomUpload ? (
                      <label
                        key={pattern.value}
                        className={`w-12 h-12 rounded-xl transition-all duration-200 overflow-hidden cursor-pointer
                          border border-[#444041]/20 hover:border-[#444041]/40
                          hover:shadow-md hover:scale-105 relative ${pattern.customStyle}`}
                        title="Upload custom pattern"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCustomPatternUpload}
                          className="hidden"
                        />
                        <div className="w-full h-full flex items-center justify-center bg-[#d3d3d3]">
                          {customPattern ? (
                            <Image
                              src={customPattern}
                              alt="Custom pattern"
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Plus className="w-6 h-6 text-[#444041]" />
                          )}
                        </div>
                      </label>
                    ) : (
                      <button
                        key={pattern.value}
                        onClick={() => handleBackgroundSelect(pattern)}
                        className={`w-12 h-12 rounded-xl transition-all duration-200 overflow-hidden
                          ${
                            selectedColor === pattern.value
                              ? "border-2 ring-2 ring-[#444041] shadow-lg transform scale-105"
                              : "border border-[#444041]/20 hover:border-[#444041]/40"
                          }
                          hover:shadow-md hover:scale-105`}
                        title={pattern.name}
                      >
                        <Image
                          src={pattern.value}
                          alt="Pattern background"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isColorPickerOpen && (
        <CustomColorPicker
          isOpen={isColorPickerOpen}
          onClose={() => setIsColorPickerOpen(false)}
          color={customColor}
          onChange={(newColor) => {
            setCustomColor(newColor);
            handleBackgroundSelect({ value: newColor });
          }}
        />
      )}
    </div>
  );
};
