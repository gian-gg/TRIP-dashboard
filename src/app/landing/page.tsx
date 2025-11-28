import {
  Header,
  Hero,
  ProblemSolution,
  FeatureDeepDive,
  TrustPartners,
  CTAFooter,
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
    </div>
  );
}

export default LandingPage;
