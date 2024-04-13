import Image from "next/image";

export function QrCode() {
  return (
    <Image
      src={'http://localhost:5000/uploads/qrcode.png'}
      alt="QR Code Connect"
      height={120}
      width={120}
    />
  )
}