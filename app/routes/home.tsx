import Timeline from "../components/Timeline";
import { artTimelineData } from "../data/artTimelineData";

export default function Home() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
            <Timeline data={artTimelineData} />
        </div>
    );
}
