import LinkCard from './LinkCard';
import { SparkleIcon, TvIcon, FilmIcon, SportIcon, GiftIcon, DeviceIcon } from './Icons';
import './CategorySection.css';

const iconMap = {
  sparkle: SparkleIcon,
  tv: TvIcon,
  film: FilmIcon,
  sport: SportIcon,
  gift: GiftIcon,
  device: DeviceIcon,
};

export default function CategorySection({ category }) {
  const Icon = iconMap[category.icon] || SparkleIcon;

  return (
    <section className="category-section reveal" id={category.id}>
      <div className="category-header">
        <div className="category-icon-wrap" style={{ background: `${category.color}12`, borderColor: `${category.color}25` }}>
          <Icon size={22} />
        </div>
        <div className="category-info">
          <h2 className="category-title">{category.title}</h2>
          <p className="category-desc">{category.description}</p>
        </div>
        <div className="category-count" style={{ color: category.color, background: `${category.color}10` }}>
          {category.links.length}
        </div>
      </div>

      <div className="links-grid">
        {category.links.map((link) => (
          <LinkCard key={link.url} link={link} accentColor={category.color} />
        ))}
      </div>
    </section>
  );
}