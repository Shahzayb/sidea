import { useRouter } from 'next/router';
import withLayout from '../../hoc/withLayout';
import withNavbar from '../../hoc/withNavbar';
import IdeaContainer from '../../components/Idea';
import withFooter from '../../hoc/withFooter';

const Idea = () => {
  const router = useRouter();
  const { ideaId } = router.query;

  return (
    <div>
      <IdeaContainer />
    </div>
  );
};

export default withFooter(withLayout(withNavbar(Idea), 'sm'));
