import { useState, useRef, useEffect } from "react";
import { Camera, CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStudents } from "@/hooks/useStudents";
import { useMarkAttendance } from "@/hooks/useAttendance";

type ScanState = "idle" | "scanning" | "success" | "failed";

interface FaceScannerProps {
  onScanComplete?: (success: boolean, studentName?: string) => void;
}

export function FaceScanner({ onScanComplete }: FaceScannerProps) {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [studentName, setStudentName] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { data: students } = useStudents();
  const markAttendance = useMarkAttendance();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const simulateScan = async () => {
    if (!students || students.length === 0) {
      setScanState("failed");
      onScanComplete?.(false);
      return;
    }

    setScanState("scanning");
    
    // Simulate face recognition process
    setTimeout(async () => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        // Pick a random student from the database
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        
        try {
          await markAttendance.mutateAsync({
            student_id: randomStudent.id,
            status: "present",
            method: "Face Recognition",
          });
          
          setStudentName(randomStudent.name);
          setScanState("success");
          onScanComplete?.(true, randomStudent.name);
        } catch (error) {
          setScanState("failed");
          onScanComplete?.(false);
        }
      } else {
        setScanState("failed");
        onScanComplete?.(false);
      }
    }, 2500);
  };

  const resetScanner = () => {
    setScanState("idle");
    setStudentName("");
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Face Recognition Scanner
        </h3>
        <p className="text-sm text-muted-foreground">
          Position your face within the frame to mark attendance
        </p>
      </div>

      {/* Camera View */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />

        {/* Overlay Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "relative h-64 w-64 rounded-full border-4 transition-all duration-500",
              scanState === "idle" && "border-primary/50",
              scanState === "scanning" && "border-primary animate-pulse-slow",
              scanState === "success" && "border-success",
              scanState === "failed" && "border-destructive"
            )}
          >
            {/* Scanning Animation */}
            {scanState === "scanning" && (
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute inset-x-0 top-0 h-1 bg-primary animate-scan" />
              </div>
            )}

            {/* Corner Markers */}
            <div className="absolute -left-1 -top-1 h-8 w-8 border-l-4 border-t-4 border-primary rounded-tl-xl" />
            <div className="absolute -right-1 -top-1 h-8 w-8 border-r-4 border-t-4 border-primary rounded-tr-xl" />
            <div className="absolute -bottom-1 -left-1 h-8 w-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
            <div className="absolute -bottom-1 -right-1 h-8 w-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
          </div>
        </div>

        {/* Status Overlay */}
        {scanState !== "idle" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
            {scanState === "scanning" && (
              <div className="text-center">
                <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
                <p className="mt-4 text-lg font-medium text-foreground">
                  Scanning face...
                </p>
                <p className="text-sm text-muted-foreground">
                  Please hold still
                </p>
              </div>
            )}

            {scanState === "success" && (
              <div className="text-center animate-slide-up">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <p className="mt-4 text-xl font-bold text-foreground">
                  {studentName}
                </p>
                <p className="text-sm text-success">
                  Attendance marked successfully
                </p>
              </div>
            )}

            {scanState === "failed" && (
              <div className="text-center animate-slide-up">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/20">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
                <p className="mt-4 text-lg font-medium text-foreground">
                  Face not recognized
                </p>
                <p className="text-sm text-muted-foreground">
                  Please try again or use manual entry
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {scanState === "idle" && (
          <Button size="lg" onClick={simulateScan} className="gap-2">
            <Camera className="h-5 w-5" />
            Start Scan
          </Button>
        )}

        {(scanState === "success" || scanState === "failed") && (
          <Button size="lg" variant="outline" onClick={resetScanner} className="gap-2">
            <RefreshCw className="h-5 w-5" />
            Scan Another
          </Button>
        )}
      </div>
    </div>
  );
}
