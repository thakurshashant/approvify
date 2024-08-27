
import Navbar from '../app/ui/navbar';
import Button from '../app/ui/buttons';
import Heading from '../app/ui/heading';
import Alert from './ui/alert';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Navbar/>
      <Alert/>
      <Heading/>
      <Button content = 'Register'/>
      <Button content = 'Login'/>

    </main>
  );
}