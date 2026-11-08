import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AsforMap } from "@/components/map/AsforMap";
import { getBranches } from "@/lib/branches";

export async function MapSection() {
  const branches = await getBranches();
  return (
    <section className="relative overflow-hidden bg-warm py-24">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="خريطة حية"
            title="أقرب إليكم... أينما كنتم"
            sub="فرعانا في برج العرب والنهضة، وفريق مبيعات يغطي محافظات مصر. اختر مندوبًا من الشبكة لتحديد نطاق تغطيته على الخريطة."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <AsforMap branches={branches} />
        </Reveal>
      </div>
    </section>
  );
}
