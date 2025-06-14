import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';
import AuthProvider from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import QuestionnairePage from "./pages/QuestionnairePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import StyleRecommendationsPage from "./pages/StyleRecommendationsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import LocationPosingSuggestionsPage from "./pages/LocationPosingSuggestionsPage";
import OutfitCoordinationPage from "./pages/OutfitCoordinationPage";
import ProfilePage from "./pages/ProfilePage";
import LookbookPage from "./pages/LookbookPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import StyleCalendarPage from "./pages/StyleCalendarPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import PersonalizationPage from "./pages/PersonalizationPage";

const queryClient = new QueryClient();

const App = () => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/style-recommendations" element={<StyleRecommendationsPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/location-posing" element={<LocationPosingSuggestionsPage />} />
              <Route path="/outfit-coordination" element={<OutfitCoordinationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/lookbook" element={<LookbookPage />} />
              <Route path="/style-calendar" element={<StyleCalendarPage />} />
              <Route path="/suggestions" element={<SuggestionsPage />} />
              <Route path="/personalization" element={<PersonalizationPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ReduxProvider>
);

export default App;
