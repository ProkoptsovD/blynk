import RecordPreviewFeature from './features/RecordPreviewFeature'
import EntitiesFeature from './features/EntitiesFeature'
import MainLayout from './layouts/MainLayout'

import { EntityContextProvider } from './providers/EntityProvider'

import './styles/index.css'

export default function App() {
  return (
    <EntityContextProvider>
      <MainLayout slots={{ sidebar: <EntitiesFeature /> }}>
        <RecordPreviewFeature />
      </MainLayout>
    </EntityContextProvider>
  )
}
