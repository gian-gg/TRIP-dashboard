import {
  Header,
  Hero,
  ProblemSolution,
  FeatureDeepDive,
  TrustPartners,
  CTAFooter,
  Disclaimer,
} from './components';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustPartners />
        <ProblemSolution />
        <FeatureDeepDive />
        <CTAFooter />
      </main>
      <Disclaimer />
    </div>
  );
}

export default LandingPage;
