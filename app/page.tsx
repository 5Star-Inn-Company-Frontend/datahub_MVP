import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import {IntroSection} from "@/components/customui/dashboard/introSection"

export default function Home() {
  return (
    <main>
      <DashBoardLayout>
          <IntroSection/>
      </DashBoardLayout>
    </main>
  )
}
