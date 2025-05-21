'use client';

import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string; // Devicon class, emoji, or SVG key
  colorClass: string;
  isGeneric?: boolean;
  useSvg?: boolean;
}

// Map skill names to SVG filenames (in public/icons/)
const svgIconMap: Record<string, string> = {
  JAX: "jax.svg",
  Streamlit: "streamlit.svg",
  XGBoost: "xgboost.svg",
  Prophet: "prophet.svg",
  YOLO: "yolo.svg",
  Databricks: "databricks.svg",
  NoSQL: "nosql.svg",
  Tavus: "tavus.svg",
  Groq: "groq.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
};

// Shared color palette
const colorPalette = [
  "bg-blue-600 text-white",
  "bg-blue-800 text-white",
  "bg-orange-700 text-white",
  "bg-blue-900 text-white",
  "bg-orange-400 text-white",
  "bg-red-500 text-white",
  "bg-orange-200 text-black",
  "bg-red-700 text-white",
  "bg-green-600 text-white",
  "bg-gray-800 text-white",
  "bg-green-900 text-white",
  "bg-blue-400 text-white",
  "bg-blue-500 text-white",
  "bg-orange-600 text-white",
  "bg-blue-400 text-white",
  "bg-blue-900 text-white",
  "bg-green-300 text-black",
  "bg-indigo-900 text-white",
  "bg-blue-200 text-black",
  "bg-blue-800 text-white",
  "bg-blue-400 text-white",
  "bg-orange-700 text-white",
  "bg-blue-700 text-white",
  "bg-blue-500 text-white",
  "bg-green-700 text-white",
  "bg-green-600 text-white",
  "bg-red-600 text-white",
  "bg-yellow-400 text-black",
  "bg-blue-600 text-white",
  "bg-blue-200 text-black",
  "bg-gray-800 text-white",
];

// All skills (Devicon, SVG, and generic), colorClass will be assigned from palette
const allSkillsRaw: Omit<Skill, 'colorClass'>[] = [
  { name: "Python", icon: "devicon-python-plain" },
  { name: "SQL", icon: "devicon-postgresql-plain" },
  { name: "Java", icon: "devicon-java-plain" },
  { name: "C++", icon: "devicon-cplusplus-plain" },
  { name: "TensorFlow", icon: "devicon-tensorflow-original" },
  { name: "PyTorch", icon: "devicon-pytorch-original" },
  { name: "scikit-learn", icon: "devicon-scikitlearn-plain" },
  { name: "Keras", icon: "devicon-keras-plain" },
  { name: "FastAPI", icon: "devicon-fastapi-plain" },
  { name: "Flask", icon: "devicon-flask-original" },
  { name: "Django", icon: "devicon-django-plain" },
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "Kubernetes", icon: "devicon-kubernetes-plain" },
  { name: "Apache Spark", icon: "devicon-apachespark-original" },
  { name: "ONNX", icon: "onnx", useSvg: true },
  { name: "numpy", icon: "numpy", useSvg: true },
  { name: "OpenCV", icon: "devicon-opencv-plain" },
  { name: "pandas", icon: "pandas", useSvg: true },
  { name: "matplotlib", icon: "devicon-matplotlib-plain" },
  { name: "Postgres", icon: "devicon-postgresql-plain" },
  { name: "Tableau", icon: "tableau", useSvg: true },
  { name: "Git", icon: "devicon-git-plain" },
  { name: "Confluence", icon: "confluence", useSvg: true },
  { name: "Jira", icon: "devicon-jira-plain" },
  { name: "Neo4j", icon: "devicon-neo4j-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "Redis", icon: "devicon-redis-plain" },
  { name: "AWS", icon: "aws", useSvg: true },
  { name: "Microsoft Azure", icon: "devicon-azure-plain" },
  { name: "Snowflake", icon: "snowflake", useSvg: true },
  { name: "Apache Kafka", icon: "devicon-apachekafka-original" },
  // SVG-based skills
  { name: "Streamlit", icon: "streamlit", useSvg: true },
  { name: "XGBoost", icon: "xgboost", useSvg: true },
  { name: "JAX", icon: "jax", useSvg: true },
  { name: "Databricks", icon: "databricks", useSvg: true },
  { name: "ROS", icon: "ros", useSvg: true },
  { name: "Slack", icon: "slack", useSvg: true },
  { name: "Jenkins", icon: "jenkins", useSvg: true },
];

// Assign color classes from palette in a round-robin fashion
const skills: Skill[] = allSkillsRaw.map((skill, i) => ({
  ...skill,
  colorClass: colorPalette[i % colorPalette.length],
}));

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-[40vh] scroll-mt-24">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading mb-8 text-center" style={{ color: "var(--color-accent)" }}>
        Tech Stack
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {skills.map((skill) => (
          <motion.span
            key={skill.name}
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm shadow ${skill.colorClass}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            {skill.useSvg && skill.name === "Snowflake" ? (
              <img src="/icons/snowflake.svg" alt="Snowflake" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "XGBoost" ? (
              <img src="/icons/xgboost.svg" alt="XGBoost" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "JAX" ? (
              <img src="/icons/jax.svg" alt="JAX" className="w-8 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "Databricks" ? (
              <img src="/icons/databricks.svg" alt="Databricks" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "Streamlit" ? (
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg" alt="Streamlit" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "ROS" ? (
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ros/ros-original.svg" alt="ROS" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "Slack" ? (
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg" alt="Slack" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "Jenkins" ? (
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-line.svg" alt="Jenkins" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "AWS" ? (
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="w-12 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "Confluence" ? (
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg" alt="Confluence" className="w-5 h-5 mr-2 inline" />
            ) : skill.useSvg && skill.name === "ONNX" ? (
              <span className="w-5 h-5 mr-2 inline-block align-middle" style={{ minWidth: 20, minHeight: 20 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M23.032 11.296c-.05 0-.1 0-.15.013L18.86 3.87a.968.968 0 0 0-1.558-1.118L9.286 1.156a.968.968 0 0 0-.968-.854a.976.976 0 0 0-.967.967a.93.93 0 0 0 .113.453L1.219 10.68a.81.81 0 0 0-.251-.038a.968.968 0 0 0 0 1.935h.037l3.368 8.33a1.1 1.1 0 0 0-.088.403a.968.968 0 0 0 1.671.666l10.115.993c.1.427.49.728.943.728c.54 0 .967-.44.967-.967a.984.984 0 0 0-.226-.628l5.114-8.872c.05.013.1.013.164.013c.54 0 .967-.44.967-.968a.97.97 0 0 0-.967-.98zm-5.805-7.275a.98.98 0 0 0 .453.327L16.147 15.92c-.1.025-.189.05-.277.1L7.451 8.708a.812.812 0 0 0 .038-.251c0-.063-.013-.126-.013-.189zm4.876 8.507l-5.177 3.556a1.105 1.105 0 0 0-.126-.075l1.546-11.674h.012l3.946 7.288a.961.961 0 0 0-.201.905zM6.383 7.502a.983.983 0 0 0-.83.955v.062l-3.455 2.048l5.378-7.702zm.352 1.91a.904.904 0 0 0 .352-.164l8.356 7.263a1.09 1.09 0 0 0-.063.352v.05l-9.31 3.845a.966.966 0 0 0-.604-.402zm8.896 8.117a.922.922 0 0 0 .503.289l.465 4.046a1.05 1.05 0 0 0-.452.452l-9.814-.955zm1.144.213a.964.964 0 0 0 .54-.867a.871.871 0 0 0-.038-.25l4.738-3.255l-4.8 8.33zm.251-14.35l-9.889 4.31l-.113-.075l1.257-5.39h.037c.34 0 .641-.176.817-.44l7.891 1.57zm-15.091 8.22c0-.063-.013-.126-.013-.189l3.908-2.3c.076.076.164.151.264.202L4.825 20.242l-3.204-7.904c.188-.176.314-.44.314-.728Z"/>
                </svg>
              </span>
            ) : skill.useSvg && skill.name === "numpy" ? (
              <img src={svgIconMap[skill.name] && svgIconMap[skill.name].startsWith('http') ? svgIconMap[skill.name] : `/icons/${svgIconMap[skill.name]}`} alt={skill.name} className="w-5 h-5 mr-2 inline" />
            ) : skill.name === "pandas" ? (
              <i className="devicon-pandas-plain colored text-lg mr-2"></i>
            ) : skill.isGeneric && !skill.useSvg ? (
              <span className="text-lg mr-2">{skill.icon}</span>
            ) : (
              <i className={`${skill.icon} text-lg mr-2`}></i>
            )}
            {skill.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}