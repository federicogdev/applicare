import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Cross1Icon,
  StopwatchIcon,
  CalendarIcon,
  StarFilledIcon,
  StarIcon,
  ComponentInstanceIcon,
  HomeIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "PENDING",
    label: "Pending",
    icon: StopwatchIcon,
  },
  {
    value: "DECLINED",
    label: "Declined",
    icon: Cross1Icon,
  },
  {
    value: "INTERVIEW",
    label: "Interview",
    icon: CalendarIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "LOW",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
];

export const types = [
  {
    label: "Part Time",
    value: "PART_TIME",
    icon: StarIcon,
  },
  {
    label: "Full Time",
    value: "FULL_TIME",
    icon: StarFilledIcon,
  },
  {
    label: "Internship",
    value: "INTERNSHIP",
    icon: ComponentInstanceIcon,
  },
  {
    label: "Remote",
    value: "REMOTE",
    icon: HomeIcon,
  },
];
