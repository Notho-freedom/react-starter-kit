import type { ComponentType, SVGProps } from "react";
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Ban,
  Bell,
  Bolt,
  Briefcase,
  Calendar,
  Camera,
  Car,
  CarFront,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Cigarette,
  CircleCheck,
  CircleHelp,
  Clock,
  CreditCard,
  EllipsisVertical,
  Euro,
  Eye,
  EyeOff,
  Globe,
  Heart,
  History,
  IdCard,
  Info,
  Leaf,
  Lightbulb,
  Locate,
  Mail,
  MapPinned,
  MessageCircle,
  MessagesSquare,
  Minus,
  Moon,
  Music,
  Lock,
  LogOut,
  Paperclip,
  PawPrint,
  Phone,
  Plus,
  Route,
  Search,
  Send,
  Share2,
  ShieldHalf,
  SlidersHorizontal,
  Snowflake,
  Sofa,
  Star,
  User,
  Users,
  Volume2,
  VolumeX,
  Wallet,
  X,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  GoogleIcon,
  MastercardIcon,
  PaypalIcon,
  VisaIcon,
} from "./BrandIcons";
import { ShieldCheckIcon } from "./ShieldCheckIcon";

type CustomIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type OpenRideIconName =
  | "apple"
  | "arrow-left"
  | "arrow-right"
  | "arrow-right-from-bracket"
  | "ban"
  | "bell"
  | "bolt"
  | "calendar"
  | "camera"
  | "car"
  | "car-side"
  | "cc-mastercard"
  | "cc-visa"
  | "check"
  | "check-double"
  | "chevron-down"
  | "chevron-right"
  | "circle-check"
  | "circle-info"
  | "circle-plus"
  | "circle-question"
  | "clock"
  | "clock-rotate-left"
  | "comments"
  | "couch"
  | "credit-card"
  | "ellipsis-vertical"
  | "envelope"
  | "euro-sign"
  | "eye"
  | "eye-slash"
  | "facebook"
  | "globe"
  | "google"
  | "heart"
  | "id-card"
  | "leaf"
  | "lightbulb"
  | "location-crosshairs"
  | "location-dot"
  | "lock"
  | "magnifying-glass"
  | "map-location-dot"
  | "message"
  | "minus"
  | "moon"
  | "music"
  | "paper-plane"
  | "paperclip"
  | "paw"
  | "paypal"
  | "phone"
  | "plus"
  | "route"
  | "share-nodes"
  | "shield-check"
  | "shield-halved"
  | "sliders"
  | "smoking"
  | "snowflake"
  | "sort"
  | "star"
  | "suitcase"
  | "user"
  | "users"
  | "volume-high"
  | "volume-xmark"
  | "wallet"
  | "xmark";

type OpenRideIconProps = {
  className?: string;
  name: OpenRideIconName;
};

const lucideIcons: Record<Exclude<OpenRideIconName, "facebook" | "google" | "paypal" | "cc-visa" | "cc-mastercard" | "shield-check">, ComponentType<LucideProps>> = {
  apple: Apple,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-right-from-bracket": LogOut,
  ban: Ban,
  bell: Bell,
  bolt: Bolt,
  calendar: Calendar,
  camera: Camera,
  car: Car,
  "car-side": CarFront,
  check: Check,
  "check-double": CheckCheck,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "circle-check": CircleCheck,
  "circle-info": Info,
  "circle-plus": CirclePlus,
  "circle-question": CircleHelp,
  clock: Clock,
  "clock-rotate-left": History,
  comments: MessagesSquare,
  couch: Sofa,
  "credit-card": CreditCard,
  "ellipsis-vertical": EllipsisVertical,
  envelope: Mail,
  "euro-sign": Euro,
  eye: Eye,
  "eye-slash": EyeOff,
  globe: Globe,
  heart: Heart,
  "id-card": IdCard,
  leaf: Leaf,
  lightbulb: Lightbulb,
  "location-crosshairs": Locate,
  "location-dot": MapPinned,
  lock: Lock,
  "magnifying-glass": Search,
  "map-location-dot": MapPinned,
  message: MessageCircle,
  minus: Minus,
  moon: Moon,
  music: Music,
  "paper-plane": Send,
  paperclip: Paperclip,
  paw: PawPrint,
  phone: Phone,
  plus: Plus,
  route: Route,
  "share-nodes": Share2,
  "shield-halved": ShieldHalf,
  sliders: SlidersHorizontal,
  smoking: Cigarette,
  snowflake: Snowflake,
  sort: ArrowUpDown,
  star: Star,
  suitcase: Briefcase,
  user: User,
  users: Users,
  "volume-high": Volume2,
  "volume-xmark": VolumeX,
  wallet: Wallet,
  xmark: X,
};

const customIcons: Record<
  Extract<OpenRideIconName, "facebook" | "google" | "paypal" | "cc-visa" | "cc-mastercard" | "shield-check">,
  CustomIconComponent
> = {
  facebook: FacebookIcon,
  google: GoogleIcon,
  paypal: PaypalIcon,
  "cc-visa": VisaIcon,
  "cc-mastercard": MastercardIcon,
  "shield-check": ShieldCheckIcon,
};

export function OpenRideIcon({ className, name }: OpenRideIconProps) {
  if (name in customIcons) {
    const CustomIcon = customIcons[name as keyof typeof customIcons];
    return <CustomIcon className={cn("inline-block h-[1em] w-[1em] shrink-0", className)} />;
  }

  const Icon = lucideIcons[name as keyof typeof lucideIcons];
  return <Icon aria-hidden="true" className={cn("inline-block h-[1em] w-[1em] shrink-0", className)} strokeWidth={1.9} />;
}
