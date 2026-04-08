import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authService } from "../../../services/auth";
import { OTPEXPIRETIME } from "../../../utilities/constants";
import { Input, Label, Button } from "../../ui/forms";

interface OtpVerificationProps {
  email: string;
  onVerified: () => void;
  isResend?: boolean;
  onCancel: () => void;
}

const OtpVerification = ({
  email,
  onVerified,
  onCancel,
}: // isResend = false,
  OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpTime, setOtpTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(OTPEXPIRETIME);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const handleGenerateOTP = async () => {
    try {
      const res = await authService.generateOTP(email);
      if (res.error) return toast.error(res.message);
      toast.success("OTP sent to your email.");
      setGeneratedOtp(res.otp);
      setOtpTime(Date.now());
      setCountdown(OTPEXPIRETIME);
      setIsOtpExpired(false);
    } catch {
      toast.error("Failed to send OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await authService.verifyOTP(email, otp);
      if (res.success) {
        toast.success("Email verified successfully.");
        onVerified(); // notify parent
      } else {
        toast.error(res.message || "OTP verification failed.");
      }
    } catch {
      toast.error("OTP verification failed.");
    }
  };

  useEffect(() => {
    if (otpTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - otpTime) / 1000);
        const remaining = Math.max(OTPEXPIRETIME - elapsed, 0);
        setCountdown(remaining);

        if (remaining === 0) {
          clearInterval(interval);
          setIsOtpExpired(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpTime]);

  return (
    <div className="col-span-2">
      <Label>Verify Email</Label>
      <div className="flex gap-3 mb-2">
        <Input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button variant="primary" onClick={handleVerifyOTP}>
          Verify OTP
        </Button>
      </div>
      {!generatedOtp && (
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleGenerateOTP}>
            Send OTP
          </Button>
          <Button
            className="text-red-500 underline"
            onClick={onCancel}
            variant="outline"
          >
            Cancel Verification
          </Button>
        </div>
      )}

      {generatedOtp && !isOtpExpired && (
        <p className="text-sm text-gray-500">
          OTP expires in: <span className="text-red-500">{countdown}s</span>
        </p>
      )}

      {isOtpExpired && (
        <p className="text-sm text-red-400">
          OTP expired.{" "}
          <button
            className="text-brand-500 underline"
            onClick={handleGenerateOTP}
          >
            Resend OTP
          </button>
        </p>
      )}
    </div>
  );
};

export default OtpVerification;
