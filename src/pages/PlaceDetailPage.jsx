import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DeletePlaceModal from '../components/DeletePlaceModal';

import PlaceDetail from '../components/PlaceDetail';

import useAdminStore from '../hooks/useAdminStore';
import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
  padding: 5em 2em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 2em;
`;

export default function PlaceDetailPage() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const placeStore = usePlaceStore();
  const adminStore = useAdminStore();

  const { selectedPlace, errorMessage } = placeStore;
  const { adminId, employeeIdentificationNumber } = adminStore;

  const placeId = location.pathname.split('/')[2];

  async function renderPlaceDetail() {
    const response = await placeStore.fetchSelectedPlace(placeId);
    await adminStore.fetchAdmin();

    if (response === 'authentication error') {
      navigate('/auth-error');
    }
  }

  useEffect(() => {
    renderPlaceDetail();
  }, [errorMessage]);

  const deletePlace = async () => {
    const response = await placeStore.deletePlace(placeId);

    if (!response) {
      return;
    }

    placeStore.clearError();
    navigate('/places');
  };

  const goPrevPage = () => {
    navigate(-1);
  };

  const toggleModal = () => {
    placeStore.clearError();
    setIsOpen(!isOpen);
  };

  const setDeleteReason = (reason) => {
    placeStore.setDeleteReason(reason);
  };

  const setAdminPassword = (password) => {
    placeStore.setAdminPassword(password);
  };

  return (
    <Container>
      <Title>
        장소 관리
        {' '}
        {'>'}
        {' '}
        상세 정보
      </Title>
      <PlaceDetail
        selectedPlace={selectedPlace}
        toggleModal={toggleModal}
        goPrevPage={goPrevPage}
      />
      <DeletePlaceModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        deletePlace={deletePlace}
        setDeleteReason={setDeleteReason}
        adminId={adminId}
        employeeIdentificationNumber={employeeIdentificationNumber}
        setAdminPassword={setAdminPassword}
        errorMessage={errorMessage}
      />
    </Container>
  );
}
