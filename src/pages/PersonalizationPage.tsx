
import { PersonalizationModal } from '@/components/personalization/PersonalizationModal';
import Layout from '@/components/layout/Layout';

const PersonalizationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <PersonalizationModal isOpen={true} onClose={() => {}} />
      </div>
    </Layout>
  );
};

export default PersonalizationPage;
