import ArtQuiz from "./QuizTask";

export default function QuizGame() {
    return (
        <div className='w-screen mx-auto py-4 px-0 flex flex-col items-center'>
            <h3 className='font-alter text-4xl font-bold text-center text-teal-500 my-4 p-4'>
                Impressionism or expressionism?
            </h3>
            <p className='font-italic text-right mb-2 p-2'>
                Depending if they are one or the other, carefully look at the
                paintings and swipe them accordingly!
            </p>
            <div className='w-screen my-4 mx-auto p-4 '>
                <ArtQuiz />
            </div>
        </div>
    );
}
