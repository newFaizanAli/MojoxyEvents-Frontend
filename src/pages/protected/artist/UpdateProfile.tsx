import { useEffect } from "react";
import { useArtistStore } from "../../../store";
import { CardSection, PageMeta } from "../../../components/shared";
import { ArtistForm } from "../../../forms/protected";

const UpdateArtistProfile = () => {

  const { artistProfile, fetchArtistProfile, isArtistProfileFetched } = useArtistStore()


  useEffect(() => {
    if (!isArtistProfileFetched) {
      fetchArtistProfile()
    }
  }, [isArtistProfileFetched, fetchArtistProfile])


  // if (isArtistProfileFetched) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   )
  // }

  return (
    <div>
      <PageMeta title={'Artist Profile'} />
      <CardSection title={`${artistProfile?.stage_name} Profile`}>
        <ArtistForm stage_name={artistProfile?.stage_name as string} />
      </CardSection>
    </div>
  )
}

export default UpdateArtistProfile
