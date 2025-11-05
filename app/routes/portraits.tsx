import InteractiveTimeline from "../components/InteractiveTimeline";
import { artTimelineData } from "../data/artTimelineData";

export default function PortraitsPage() {
    return <InteractiveTimeline data={artTimelineData} />;
}
