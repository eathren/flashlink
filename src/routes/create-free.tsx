import { Button } from "@/components/ui/button"
import { createFileRoute, Link } from "@tanstack/react-router"
import html2canvas from "html2canvas"
import { useRef } from "react"

function CreateFree() {
  const cardRef = useRef(null)

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = "business-card.png"
        link.click()
      })
    }
  }

  return (
    <div className="p-2">
      <div ref={cardRef} className="border p-4 w-80 mx-auto">
        <h4>Your Business Card</h4>
        <p>Name: Your Name</p>
        <p>Email: your.email@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>LinkedIn: linkedin.com/in/yourprofile</p>
        <p>Discord: yourdiscord#1234</p>
        {/* Add more customizable fields here */}
      </div>
      <Button onClick={downloadCard}>Create and Download Free Card</Button>
      <Link to="/sign-up">
        <Button>Sign Up for an Account</Button>
      </Link>
    </div>
  )
}

export const Route = createFileRoute("/create-free")({
  component: CreateFree,
})
