
import React from 'react';
import Layout from '../components/layout/Layout';
import LocationBasedPosingSuggestions from '../components/location-posing/LocationBasedPosingSuggestions';

const LocationPosingSuggestionsPage = () => {
  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <LocationBasedPosingSuggestions />
      </div>
    </Layout>
  );
};

export default LocationPosingSuggestionsPage;
