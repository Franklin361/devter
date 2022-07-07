import type { NextPage } from 'next'

import { GenericLayout } from '../layout';
import { Hero } from '../components';


const Home: NextPage = () => {
  
  return (
    <GenericLayout title='Devter | Home'>
      <Hero/>
    </GenericLayout>
  )
}

export default Home
