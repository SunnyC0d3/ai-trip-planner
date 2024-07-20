import './App.css'
import Hero from './components/ui/Hero'

function App() {
  const heroTitle = (<><span className="text-[#f56551]">Discover your next adventure with AI:</span> personalised itineraries at your fingertips</>);
  const heroShortDescription = 'Your personal trip planner and travel curator, creating custom itineraries tailored to your interest and budget.';
  const heroBtnText = 'Get started, it\'s free.';

  return (
    <>
      <Hero title={heroTitle} shortDescription={heroShortDescription} btnText={heroBtnText} />
    </>
  )
}

export default App
