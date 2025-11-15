import { Category, Product, BlogPost } from "./types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Budgies",
    slug: "budgies",
    minAge: 10,
    description: "Small, friendly parrots perfect for beginners"
  },
  {
    id: 2,
    name: "Conures",
    slug: "conures",
    minAge: 12,
    description: "Playful and colorful medium-sized parrots"
  },
  {
    id: 3,
    name: "African Greys",
    slug: "african-greys",
    minAge: 14,
    description: "Highly intelligent and talkative parrots"
  },
  {
    id: 4,
    name: "Macaws",
    slug: "macaws",
    minAge: 16,
    description: "Large, majestic parrots requiring experienced owners"
  },
  {
    id: 5,
    name: "Cockatoos",
    slug: "cockatoos",
    minAge: 16,
    description: "Affectionate but demanding large parrots"
  },
  {
    id: 6,
    name: "Accessories",
    slug: "accessories",
    minAge: 0,
    description: "Cages, toys, food, and care supplies"
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "Blue Budgie",
    categoryId: 1,
    category: categories[0],
    price: 45,
    image: "/api/placeholder/400/400",
    images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
    description: "A beautiful blue budgie with a friendly personality. Perfect for families with children 10+.",
    highlights: ["Friendly", "Easy to train", "Great for beginners", "Colorful"],
    temperament: "Friendly and social, loves interaction",
    careLevel: "Easy",
    size: "Small",
    popularity: 95
  },
  {
    id: 2,
    name: "Green-Cheeked Conure",
    categoryId: 2,
    category: categories[1],
    price: 350,
    image: "/api/placeholder/400/400",
    images: ["/api/placeholder/400/400"],
    description: "Playful and affectionate conure with a gentle nature.",
    highlights: ["Playful", "Affectionate", "Quieter than other conures", "Smart"],
    temperament: "Playful and loving, enjoys cuddling",
    careLevel: "Moderate",
    size: "Medium",
    popularity: 88
  },
  {
    id: 3,
    name: "African Grey Parrot",
    categoryId: 3,
    category: categories[2],
    price: 1500,
    image: "/api/placeholder/400/400",
    images: ["/api/placeholder/400/400"],
    description: "Highly intelligent African Grey with exceptional talking ability.",
    highlights: ["Highly intelligent", "Excellent talker", "Long lifespan", "Sensitive"],
    temperament: "Intelligent and sensitive, requires mental stimulation",
    careLevel: "Advanced",
    size: "Medium",
    popularity: 92
  },
  {
    id: 4,
    name: "Scarlet Macaw",
    categoryId: 4,
    category: categories[3],
    price: 2500,
    image: "/api/placeholder/400/400",
    images: ["/api/placeholder/400/400"],
    description: "Stunning scarlet macaw with vibrant colors. Requires experienced owner.",
    highlights: ["Stunning colors", "Long lifespan", "Bonding bird", "Requires space"],
    temperament: "Bold and social, needs lots of attention",
    careLevel: "Advanced",
    size: "Large",
    popularity: 85
  },
  {
    id: 5,
    name: "Sulphur-Crested Cockatoo",
    categoryId: 5,
    category: categories[4],
    price: 2000,
    image: "/api/placeholder/400/400",
    images: ["/api/placeholder/400/400"],
    description: "Affectionate cockatoo that requires dedicated care and attention.",
    highlights: ["Very affectionate", "Long lifespan", "Can be loud", "Needs attention"],
    temperament: "Affectionate but demanding, requires constant interaction",
    careLevel: "Advanced",
    size: "Large",
    popularity: 78
  },
  {
    id: 6,
    name: "Premium Parrot Cage",
    categoryId: 6,
    category: categories[5],
    price: 299,
    image: "/api/placeholder/400/400",
    images: ["/api/placeholder/400/400"],
    description: "Spacious and durable cage perfect for medium to large parrots.",
    highlights: ["Spacious", "Durable", "Easy to clean", "Includes accessories"],
    temperament: "N/A",
    careLevel: "Easy",
    size: "Large",
    popularity: 90
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Choosing the Right Parrot for Your Family",
    slug: "choosing-right-parrot",
    excerpt: "Learn how to select the perfect parrot companion based on your family's lifestyle and experience level.",
    content: `
      <h2>Introduction</h2>
      <p>Bringing a parrot into your family is an exciting decision, but it's crucial to choose the right species that matches your lifestyle, experience level, and family dynamics. With over 350 species of parrots, finding the perfect feathered companion requires careful consideration.</p>

      <h2>Consider Your Experience Level</h2>
      <p><strong>For Beginners:</strong> If you're new to parrot ownership, start with smaller, more manageable species like Budgies or Cockatiels. These birds are generally easier to care for, less expensive, and more forgiving of beginner mistakes.</p>
      
      <p><strong>For Intermediate Owners:</strong> Conures, Lovebirds, and smaller Amazon parrots are great options. They require more attention and training but offer more interaction and personality.</p>
      
      <p><strong>For Experienced Owners:</strong> Large parrots like African Greys, Macaws, and Cockatoos are intelligent and demanding. They require extensive time, space, and expertise to thrive.</p>

      <h2>Age Considerations</h2>
      <p>Different parrot species have different age recommendations:</p>
      <ul>
        <li><strong>Budgies:</strong> Suitable for children 10+ with adult supervision</li>
        <li><strong>Conures:</strong> Recommended for ages 12+ with adult guidance</li>
        <li><strong>African Greys:</strong> Best for ages 14+ or adult owners</li>
        <li><strong>Macaws & Cockatoos:</strong> Recommended for ages 16+ or experienced adult owners</li>
      </ul>

      <h2>Lifestyle Factors</h2>
      <p><strong>Time Commitment:</strong> Parrots are social creatures requiring daily interaction. Larger species may need 3-4 hours of attention daily, while smaller birds need at least 1-2 hours.</p>
      
      <p><strong>Noise Level:</strong> Consider your living situation. Some parrots are naturally louder than others. Macaws and Cockatoos can be very vocal, while Budgies and Canaries are generally quieter.</p>
      
      <p><strong>Space Requirements:</strong> Larger parrots need spacious cages and room to fly. Ensure you have adequate space for both the cage and out-of-cage time.</p>

      <h2>Budget Considerations</h2>
      <p>Beyond the initial purchase price, consider ongoing costs:</p>
      <ul>
        <li>Quality cage and accessories ($200-$2000+)</li>
        <li>Monthly food and treats ($30-$100+)</li>
        <li>Veterinary care and checkups ($100-$300 annually)</li>
        <li>Toys and enrichment items ($20-$50 monthly)</li>
      </ul>

      <h2>Matching Personality</h2>
      <p>Each parrot species has unique personality traits. Research thoroughly and, if possible, spend time with different species before making your decision. Visit reputable breeders or rescue centers to interact with various parrots.</p>

      <h2>Conclusion</h2>
      <p>Choosing the right parrot is a long-term commitment that can last 10-80 years depending on the species. Take your time, do thorough research, and consider all factors before bringing a feathered friend into your home. The right match will bring years of joy and companionship to your family.</p>
    `,
    image: "https://images.unsplash.com/photo-1604254209600-0e1c0a0e0b0e?w=800&h=400&fit=crop",
    publishedAt: "2024-01-15",
    author: "Global Parrot Center Team",
    tags: ["Care", "Family", "Beginners"]
  },
  {
    id: 2,
    title: "Parrot Training Tips for Beginners",
    slug: "parrot-training-tips",
    excerpt: "Essential training techniques to build a strong bond with your feathered friend.",
    content: `
      <h2>Introduction</h2>
      <p>Training your parrot is not just about teaching tricks—it's about building trust, communication, and a strong bond. Proper training helps prevent behavioral issues and creates a happier, more confident bird.</p>

      <h2>Building Trust First</h2>
      <p>Before any training begins, your parrot must trust you. This foundation is crucial for all future training success.</p>
      
      <p><strong>Tips for Building Trust:</strong></p>
      <ul>
        <li>Spend time near the cage without forcing interaction</li>
        <li>Speak softly and calmly around your parrot</li>
        <li>Offer treats from your hand, starting with the cage door open</li>
        <li>Move slowly and predictably—sudden movements cause fear</li>
        <li>Respect your parrot's body language and boundaries</li>
      </ul>

      <h2>Positive Reinforcement Training</h2>
      <p>Positive reinforcement is the most effective training method. Reward desired behaviors immediately with treats, praise, or attention.</p>
      
      <p><strong>Step Training:</strong> Start with step-up training, one of the most fundamental commands:</p>
      <ol>
        <li>Hold a treat near your parrot's chest</li>
        <li>Say "step up" as you gently press against their lower chest</li>
        <li>When they step onto your finger, immediately reward with the treat</li>
        <li>Repeat daily in short 5-10 minute sessions</li>
      </ol>

      <h2>Target Training</h2>
      <p>Target training teaches your parrot to touch a target stick, which is useful for teaching other behaviors and moving your bird safely.</p>
      
      <p><strong>How to Target Train:</strong></p>
      <ol>
        <li>Present a small stick or chopstick near your parrot</li>
        <li>When they touch it with their beak, immediately reward</li>
        <li>Gradually move the target to different locations</li>
        <li>Use the target to guide your parrot where you want them to go</li>
      </ol>

      <h2>Teaching Basic Commands</h2>
      <p><strong>"Step Up":</strong> Essential for handling and moving your parrot safely.</p>
      <p><strong>"Step Down":</strong> Teaches your parrot to move from your hand to a perch or surface.</p>
      <p><strong>"Stay":</strong> Helps your parrot remain calm in one place.</p>
      <p><strong>"Come":</strong> Useful for recall training (start in a safe, enclosed space).</p>

      <h2>Training Schedule</h2>
      <p>Consistency is key to successful training:</p>
      <ul>
        <li><strong>Frequency:</strong> Train daily, but keep sessions short (5-15 minutes)</li>
        <li><strong>Timing:</strong> Best times are when your parrot is alert but not overly excited</li>
        <li><strong>Environment:</strong> Choose a quiet, distraction-free area</li>
        <li><strong>Patience:</strong> Progress may be slow—celebrate small victories</li>
      </ul>

      <h2>Common Training Mistakes to Avoid</h2>
      <ul>
        <li><strong>Moving too fast:</strong> Rushing training can damage trust</li>
        <li><strong>Negative reinforcement:</strong> Punishment creates fear, not learning</li>
        <li><strong>Inconsistent commands:</strong> Use the same words and gestures each time</li>
        <li><strong>Training when stressed:</strong> If your parrot seems anxious, stop and try later</li>
        <li><strong>Expecting too much:</strong> Each bird learns at their own pace</li>
      </ul>

      <h2>Advanced Training</h2>
      <p>Once your parrot masters basic commands, you can teach fun tricks like:</p>
      <ul>
        <li>Waving hello</li>
        <li>Spinning in a circle</li>
        <li>Playing dead</li>
        <li>Retrieving objects</li>
        <li>Solving puzzle toys</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Training your parrot is a rewarding journey that strengthens your bond and provides mental stimulation for your bird. Remember to be patient, consistent, and always use positive reinforcement. With time and dedication, you'll develop a wonderful relationship with your feathered companion.</p>
    `,
    image: "https://images.unsplash.com/photo-1541781778899-1b61d9a6d0b0?w=800&h=400&fit=crop",
    publishedAt: "2024-01-10",
    author: "Global Parrot Center Team",
    tags: ["Training", "Tips", "Beginners"]
  },
  {
    id: 3,
    title: "Understanding Parrot Behavior and Body Language",
    slug: "parrot-behavior",
    excerpt: "Decode your parrot's signals and understand what they're trying to communicate.",
    content: `
      <h2>Introduction</h2>
      <p>Parrots are highly intelligent and expressive creatures. Understanding their body language and behavior is essential for building a strong relationship and ensuring their well-being. Learning to read your parrot's signals helps you respond appropriately to their needs and emotions.</p>

      <h2>Understanding Body Language</h2>
      
      <h3>Eye Pinning</h3>
      <p>Eye pinning (rapid dilation and constriction of pupils) can indicate excitement, interest, or sometimes aggression. Context is key—watch for other body language cues.</p>
      
      <h3>Feather Position</h3>
      <ul>
        <li><strong>Fluffed feathers:</strong> Can indicate relaxation, sleepiness, or illness (check for other symptoms)</li>
        <li><strong>Flattened feathers:</strong> Often a sign of fear, aggression, or submission</li>
        <li><strong>Ruffled feathers:</strong> Usually means the bird is preening or adjusting feathers</li>
        <li><strong>Raised feathers on head/neck:</strong> Can indicate excitement or aggression</li>
      </ul>

      <h3>Wing Position</h3>
      <ul>
        <li><strong>Wings held away from body:</strong> Cooling down or showing off</li>
        <li><strong>Wings drooping:</strong> Could indicate illness or exhaustion</li>
        <li><strong>Wing flapping while perched:</strong> Exercise, excitement, or a request for attention</li>
        <li><strong>One wing extended:</strong> Stretching or showing dominance</li>
      </ul>

      <h3>Tail Position</h3>
      <ul>
        <li><strong>Fanned tail:</strong> Excitement, aggression, or courtship display</li>
        <li><strong>Wagging tail:</strong> Usually indicates happiness or contentment</li>
        <li><strong>Pumped tail:</strong> Can signal respiratory issues or excitement</li>
      </ul>

      <h2>Vocalizations and Their Meanings</h2>
      
      <h3>Happy Sounds</h3>
      <ul>
        <li><strong>Chirping/Chattering:</strong> Contentment and happiness</li>
        <li><strong>Singing:</strong> Joy and well-being</li>
        <li><strong>Soft clicking:</strong> Contentment or self-soothing</li>
      </ul>

      <h3>Warning Signs</h3>
      <ul>
        <li><strong>Loud, repetitive screaming:</strong> Attention-seeking, boredom, or distress</li>
        <li><strong>Hissing:</strong> Fear or aggression—give space</li>
        <li><strong>Growling:</strong> Clear warning of aggression</li>
      </ul>

      <h2>Common Behaviors Explained</h2>
      
      <h3>Preening</h3>
      <p>Preening is normal grooming behavior. Parrots spend significant time maintaining their feathers. If excessive, it could indicate stress or health issues.</p>

      <h3>Beak Grinding</h3>
      <p>This soft grinding sound usually indicates contentment and relaxation, often heard before sleep.</p>

      <h3>Head Bobbing</h3>
      <p>Can indicate excitement, courtship behavior, or a request for attention. Context matters—watch for other signals.</p>

      <h3>Regurgitation</h3>
      <p>When a parrot regurgitates food, it's often a sign of affection (they're trying to feed you). However, frequent regurgitation without a clear cause may indicate health issues.</p>

      <h2>Stress and Fear Indicators</h2>
      <p>Recognizing stress is crucial for your parrot's health:</p>
      <ul>
        <li>Feather plucking or excessive preening</li>
        <li>Loss of appetite</li>
        <li>Aggressive behavior</li>
        <li>Hiding or trying to escape</li>
        <li>Excessive vocalization</li>
        <li>Changes in droppings</li>
        <li>Lethargy or decreased activity</li>
      </ul>

      <h2>Positive Behaviors</h2>
      <p>Signs your parrot is happy and healthy:</p>
      <ul>
        <li>Active and playful</li>
        <li>Eating and drinking normally</li>
        <li>Interested in toys and enrichment</li>
        <li>Comfortable being handled (if trained)</li>
        <li>Vocalizing in a happy, varied manner</li>
        <li>Good feather condition</li>
        <li>Regular sleep patterns</li>
      </ul>

      <h2>Social Behaviors</h2>
      <p>Parrots are social animals with complex social needs:</p>
      <ul>
        <li><strong>Bonding:</strong> Parrots form strong bonds with their human companions</li>
        <li><strong>Jealousy:</strong> They can become jealous of other pets or people</li>
        <li><strong>Territoriality:</strong> Some parrots are territorial about their cage or favorite perches</li>
        <li><strong>Flock behavior:</strong> They seek to be part of a "flock" (your family)</li>
      </ul>

      <h2>When to Seek Help</h2>
      <p>Consult a veterinarian if you notice:</p>
      <ul>
        <li>Sudden behavior changes</li>
        <li>Signs of illness (lethargy, loss of appetite, abnormal droppings)</li>
        <li>Excessive feather plucking</li>
        <li>Aggression that seems unprovoked</li>
        <li>Self-mutilation</li>
        <li>Persistent stress indicators</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Understanding your parrot's behavior and body language is an ongoing learning process. Each bird is unique, and you'll develop a deeper understanding of your specific parrot over time. Pay attention to patterns, trust your instincts, and always prioritize your parrot's well-being. When in doubt, consult with an avian veterinarian or experienced parrot behaviorist.</p>
    `,
    image: "https://images.unsplash.com/photo-1604254209600-0e1c0a0e0b0e?w=800&h=400&fit=crop",
    publishedAt: "2024-01-05",
    author: "Global Parrot Center Team",
    tags: ["Behavior", "Care", "Health"]
  }
];

