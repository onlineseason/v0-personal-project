"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        About Me
      </motion.h1>

      {/* Bio Section */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold">My Journey</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              I am Dorna Raj Budthapa, an entrepreneur, engineer, and digital advocate passionate about leveraging
              technology to create sustainable solutions for communities in Nepal and beyond.
            </p>
            <p>
              With a background in engineering and a vision for digital transformation, I've dedicated my career to
              bridging the gap between technology and everyday challenges faced by people in developing regions.
            </p>
            <p>
              My work spans across renewable energy, sustainable agriculture, and digital literacy initiatives, always
              with the goal of creating lasting positive impact.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%282%29.png-UOR4AEPdTjtTkXiVOadB60UNQn2J6x.jpeg"
            alt="Dorna Raj Budthapa"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Research Interests Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Research Interests</h2>
        <div className="mx-auto max-w-4xl rounded-lg border bg-card p-8 shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Internet of Things (IoT) & Next Generation Communication</h3>
                <p className="mt-4 text-muted-foreground">
                  My research focuses on emerging technologies including Internet of Things (IoT), Internet of
                  Nano-Things (IoNT), Sensors, Robotics, Industrial Automation, and Next Generation Communication
                  Networks (5G/6G).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">AI/ML in High-Altitude Agriculture</h3>
                <p className="mt-4 text-muted-foreground">
                  Exploring the application of Artificial Intelligence and Machine Learning for:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>
                    Early disease detection in high-altitude crops including Chino, Kaguno, Millet, and Marsi Rice
                  </li>
                  <li>Crop maturity analysis and yield prediction for mountain agriculture</li>
                  <li>Automated monitoring of medicinal herbs and traditional crops</li>
                  <li>Climate impact assessment on high-altitude farming systems</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Current Research Project:</h4>
                <p className="mt-2 text-muted-foreground">
                  <strong>
                    Next-Gen Communication Network Li-Fi Technology and its Feasibility Study in Rural Areas of
                    Karnali-Jumla
                  </strong>
                  <br />
                  <span className="text-sm">With Hari Narayan Yadav and Nabin Budhathoki, Mid West University</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current Work Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Current Work</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">Lekali Karesa</h3>
            <p className="mt-2 text-muted-foreground">
              Founder and CEO of Lekali Karesa, a platform connecting rural farmers with urban markets through
              sustainable agriculture practices.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">Season Electric</h3>
            <p className="mt-2 text-muted-foreground">
              Co-founder of Season Electric, developing renewable energy solutions tailored for rural communities with
              limited access to the power grid.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">Digital Nepal Initiative</h3>
            <p className="mt-2 text-muted-foreground">
              Leading advocate for the Digital Nepal Initiative, working to increase digital literacy and technology
              adoption across the country.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Experience</h2>
        <div className="mx-auto max-w-3xl">
          <div className="relative border-l border-muted pl-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-10 relative"
            >
              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold">Counselor</h3>
              <p className="text-sm text-muted-foreground">Sungava Education Center, Surkhet</p>
              <p className="mt-2 text-muted-foreground">
                Provided educational and career counseling to students, helping them navigate academic choices and
                professional development opportunities.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-10 relative"
            >
              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold">Vice President</h3>
              <p className="text-sm text-muted-foreground">Karnali Engineering Student Society</p>
              <p className="mt-2 text-muted-foreground">
                Led initiatives to promote engineering education and professional development among students in the
                Karnali region.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold">Researcher</h3>
              <p className="text-sm text-muted-foreground">Mid-West University</p>
              <p className="mt-2 text-muted-foreground">
                Conducted research on next-generation communication technologies with a focus on applications in rural
                and remote areas.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vision & Goals Section */}
      <div>
        <h2 className="mb-8 text-center text-2xl font-bold">Vision & Goals</h2>
        <div className="mx-auto max-w-3xl">
          <div className="relative border-l border-muted pl-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-10 relative"
            >
              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold">Sustainable Technology</h3>
              <p className="mt-2 text-muted-foreground">
                Develop and implement technology solutions that are environmentally sustainable and economically viable
                for communities in developing regions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-10 relative"
            >
              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold">Digital Inclusion</h3>
              <p className="mt-2 text-muted-foreground">
                Bridge the digital divide by ensuring that technology and digital literacy are accessible to all,
                regardless of geographic or economic barriers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold">Community Empowerment</h3>
              <p className="mt-2 text-muted-foreground">
                Empower local communities through technology education and entrepreneurship opportunities, creating
                sustainable economic growth from within.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
