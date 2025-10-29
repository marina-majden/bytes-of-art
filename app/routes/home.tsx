import InteractiveTimeline from "../components/InteractiveTimeline";
import { artTimelineData } from "../data/artTimelineData";

export default function Home() {
    return (
        <>
            <InteractiveTimeline data={artTimelineData} />
        </>
    );
}
