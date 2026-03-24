import { useState, useRef, useCallback } from "react";
import type { TeamMember } from "@/lib/constants/team";
import html2canvas from "html2canvas";

interface Props {
  members: TeamMember[];
}

export default function SocialPostGenerator({ members }: Props) {
  const [selected, setSelected] = useState<TeamMember>(members[0]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: 1200,
        height: 675,
      });
      const link = document.createElement("a");
      link.download = `crafter-station-${selected.username}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  }, [selected]);

  return (
    <div className="flex flex-col gap-8">
      {/* Member selector */}
      <div>
        <p className="text-xs text-muted-foreground mb-3">
          Select a team member
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {members.map((member) => (
            <button
              key={member.username}
              onClick={() => setSelected(member)}
              className={`flex flex-col items-center gap-1.5 p-3 border transition-colors ${
                selected.username === member.username
                  ? "border-foreground bg-secondary"
                  : "border-divider hover:border-muted-foreground"
              }`}
            >
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-[10px] text-muted-foreground text-center leading-tight">
                {member.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground">Preview (1200×675)</p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 bg-foreground text-background text-xs font-medium hover:bg-muted-foreground transition-colors disabled:opacity-50"
          >
            {downloading ? "Generating..." : "Download PNG"}
          </button>
        </div>

        <div className="border border-divider overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div
              ref={cardRef}
              style={{
                width: 1200,
                height: 675,
                fontFamily:
                  "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                background: "#131010",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle spotlight glow from top */}
              <div
                style={{
                  position: "absolute",
                  top: "-200px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "800px",
                  height: "600px",
                  background:
                    "radial-gradient(ellipse at center, rgba(242, 237, 237, 0.06) 0%, rgba(242, 237, 237, 0.02) 40%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Subtle grid pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(242,237,237,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,237,0.02) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "40px",
                }}
              >
                {/* Circular photo with ring */}
                <div
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    border: "3px solid #3D3838",
                    padding: "4px",
                    marginBottom: 28,
                    flexShrink: 0,
                    boxShadow:
                      "0 0 60px rgba(242, 237, 237, 0.05), 0 0 120px rgba(242, 237, 237, 0.02)",
                  }}
                >
                  <img
                    src={selected.photoUrl}
                    alt={selected.name}
                    crossOrigin="anonymous"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Name */}
                <h1
                  style={{
                    fontSize: 44,
                    fontWeight: 700,
                    color: "#F2EDED",
                    letterSpacing: "-0.02em",
                    margin: 0,
                    lineHeight: 1.1,
                    textAlign: "center",
                  }}
                >
                  {selected.name}
                </h1>

                {/* Position */}
                <p
                  style={{
                    fontSize: 17,
                    fontWeight: 400,
                    color: "#B8B2B2",
                    margin: "10px 0 0 0",
                    textAlign: "center",
                  }}
                >
                  {selected.position}
                </p>

                {/* Location */}
                {selected.location && (
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#7F7A7A",
                      margin: "6px 0 0 0",
                      textAlign: "center",
                    }}
                  >
                    {selected.location}
                  </p>
                )}

                {/* Skills */}
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    maxWidth: 700,
                    lineHeight: 2.4,
                  }}
                >
                  {selected.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: 11,
                        fontWeight: 400,
                        color: "#B8B2B2",
                        border: "1px solid #3D3838",
                        padding: "8px 12px",
                        margin: "5px 4px",
                        display: "inline",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom branding */}
              <div
                style={{
                  position: "absolute",
                  bottom: 28,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <img
                  src="/brand/icon-white.svg"
                  alt="Crafter Station"
                  crossOrigin="anonymous"
                  style={{ width: 18, height: 18, opacity: 0.5 }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#7F7A7A",
                    letterSpacing: "0.05em",
                  }}
                >
                  CRAFTER STATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
