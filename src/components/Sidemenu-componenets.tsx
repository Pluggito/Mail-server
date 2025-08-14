"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Plus,
  Inbox,
  Send,
  FileText,
  AlertTriangle,
  Trash2,
  Star,
  Paperclip,
  ImageIcon,
  Smile,
} from "lucide-react"
import { useState, useCallback, useMemo } from "react"

// Move constants outside component to prevent recreation
const SIDEBAR_ITEMS = [
  { name: "Inbox", icon: Inbox, active: true },
  { name: "Starred", icon: Star },
  { name: "Sent", icon: Send },
  { name: "Drafts", icon: FileText, count: 2 },
  { name: "Spam", icon: AlertTriangle },
  { name: "Trash", icon: Trash2 },
] as const

const LABELS = [
  { name: "Important", color: "bg-red-500" },
  { name: "Work", color: "bg-blue-500" },
  { name: "Personal", color: "bg-green-500" },
] as const

interface SidebarItemProps {
  item: (typeof SIDEBAR_ITEMS)[number]
  sidebarOpen: boolean
}

const SidebarItem = ({ item, sidebarOpen }: SidebarItemProps) => {
  const IconComponent = item.icon

  return (
    <Button
      variant={item.active ? "secondary" : "ghost"}
      className={`w-full justify-start rounded-r-full cursor-pointer ${!sidebarOpen && "px-2"}`}
      size={sidebarOpen ? "default" : "icon"}
    >
      <IconComponent className={`h-4 w-4 ${sidebarOpen ? "mr-2" : ""}`} />
      {sidebarOpen && (
        <>
          <span className="flex-1 text-left">{item.name}</span>
          {item.count && (
            <Badge variant="secondary" className="ml-auto">
              {item.count}
            </Badge>
          )}
        </>
      )}
    </Button>
  )
}

interface LabelItemProps {
  label: (typeof LABELS)[number]
}

const LabelItem = ({ label }: LabelItemProps) => (
  <Button variant="ghost" className="w-full justify-start text-sm">
    <div className={`w-3 h-3 rounded-full ${label.color} mr-2`} />
    {label.name}
  </Button>
)

const SidebarContent = ({
  sidebarOpen,
  setSidebarOpen,
}: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
  const [composeOpen, setComposeOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen)
  }, [sidebarOpen, setSidebarOpen])

  const closeCompose = useCallback(() => {
    setComposeOpen(false)
  }, [])

  return (
    <div className="p-4 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu strokeWidth={3} className="h-5 w-5" />
        </Button>
        {sidebarOpen && <h1 className="text-xl font-semibold">Mail</h1>}
      </div>

      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full mb-6 h-[60px] rounded-full bg-gradient-to-r from-[#005d9b] to-[#0b2c4d] cursor-pointer text-white"
            size={sidebarOpen ? "default" : "icon"}
            aria-label="Compose new email"
          >
            <Plus size={20} strokeWidth={3} />
            {sidebarOpen && <span className="ml-2">Compose</span>}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="To" aria-label="Recipient email" />
            <Input placeholder="Subject" aria-label="Email subject" />
            <Textarea placeholder="Compose your message..." className="min-h-[200px]" aria-label="Email content" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" aria-label="Attach file">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" aria-label="Insert image">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" aria-label="Insert emoji">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={closeCompose}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation Items */}
      <nav className="space-y-1 mb-8" role="navigation" aria-label="Email folders">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem key={item.name} item={item} sidebarOpen={sidebarOpen} />
        ))}
      </nav>

      {/* Labels Section */}
      {sidebarOpen && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Labels</h3>
          <div className="space-y-1" role="list" aria-label="Email labels">
            {LABELS.map((label) => (
              <LabelItem key={label.name} label={label} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const SidemenuComponents = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sidebarClasses = useMemo(
    () => `${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 border-r bg-muted/20 h-full flex-shrink-0`,
    [sidebarOpen],
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={sidebarClasses}>
        <SidebarContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Mobile Menu Button */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent sidebarOpen={true} setSidebarOpen={() => {}} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default SidemenuComponents
