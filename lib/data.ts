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
    image: "https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg",
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
    image: "https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg",
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
    image: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    publishedAt: "2024-01-05",
    author: "Global Parrot Center Team",
    tags: ["Behavior", "Care", "Health"]
  },
  {
    id: 4,
    title: "Complete Guide to Parrot Care",
    slug: "parrot-care",
    excerpt: "Essential care tips for keeping your parrot healthy, happy, and thriving in your home.",
    content: `
      <h2>Introduction</h2>
      <p>Proper care is the foundation of a long, healthy life for your parrot. This comprehensive guide covers all aspects of parrot care, from daily routines to long-term health maintenance.</p>

      <h2>Daily Care Routine</h2>
      <p><strong>Morning Routine:</strong></p>
      <ul>
        <li>Check food and water dishes - replace with fresh food and clean water</li>
        <li>Observe your parrot's behavior and appearance for any signs of illness</li>
        <li>Allow morning sunlight exposure (if safe) for vitamin D</li>
        <li>Provide fresh fruits and vegetables</li>
      </ul>

      <p><strong>Evening Routine:</strong></p>
      <ul>
        <li>Cover the cage for proper sleep (10-12 hours recommended)</li>
        <li>Ensure the cage is in a quiet, dark area</li>
        <li>Remove any uneaten fresh food to prevent spoilage</li>
      </ul>

      <h2>Cage Setup and Maintenance</h2>
      <p><strong>Cage Size:</strong> Your parrot's cage should be large enough for them to fully extend their wings and move around comfortably. The minimum cage size should be at least 1.5 times the bird's wingspan in width and height.</p>

      <p><strong>Essential Cage Items:</strong></p>
      <ul>
        <li>Multiple perches of varying sizes and textures</li>
        <li>Food and water dishes (stainless steel recommended)</li>
        <li>Toys for mental stimulation</li>
        <li>Cutting board or platform for food</li>
        <li>Bath dish or misting system</li>
      </ul>

      <p><strong>Cleaning Schedule:</strong></p>
      <ul>
        <li><strong>Daily:</strong> Clean food and water dishes</li>
        <li><strong>Weekly:</strong> Deep clean cage, perches, and toys</li>
        <li><strong>Monthly:</strong> Replace worn toys and perches</li>
      </ul>

      <h2>Nutrition and Diet</h2>
      <p>A balanced diet is crucial for your parrot's health:</p>
      <ul>
        <li><strong>Pellets (60-70%):</strong> High-quality commercial pellets should form the base of the diet</li>
        <li><strong>Fresh Vegetables (20-25%):</strong> Dark leafy greens, carrots, bell peppers, broccoli</li>
        <li><strong>Fresh Fruits (5-10%):</strong> Apples, berries, melons (remove seeds from apples)</li>
        <li><strong>Seeds and Nuts (5-10%):</strong> Treats only, not a primary food source</li>
      </ul>

      <p><strong>Foods to Avoid:</strong></p>
      <ul>
        <li>Avocado (toxic to birds)</li>
        <li>Chocolate and caffeine</li>
        <li>Alcohol</li>
        <li>Onions and garlic</li>
        <li>High-fat or salty foods</li>
      </ul>

      <h2>Social Interaction and Enrichment</h2>
      <p>Parrots are highly social creatures that require daily interaction:</p>
      <ul>
        <li><strong>Out-of-cage time:</strong> Minimum 2-4 hours daily for larger parrots</li>
        <li><strong>Training sessions:</strong> Daily 10-15 minute training sessions</li>
        <li><strong>Playtime:</strong> Interactive toys and puzzles</li>
        <li><strong>Socialization:</strong> Include your parrot in family activities</li>
      </ul>

      <h2>Health Monitoring</h2>
      <p><strong>Signs of a Healthy Parrot:</strong></p>
      <ul>
        <li>Bright, clear eyes</li>
        <li>Clean, smooth feathers</li>
        <li>Active and alert behavior</li>
        <li>Normal eating and drinking</li>
        <li>Regular, normal droppings</li>
      </ul>

      <p><strong>Warning Signs:</strong></p>
      <ul>
        <li>Lethargy or decreased activity</li>
        <li>Loss of appetite</li>
        <li>Discharge from eyes or nostrils</li>
        <li>Changes in droppings (color, consistency, frequency)</li>
        <li>Feather plucking or self-mutilation</li>
        <li>Difficulty breathing</li>
      </ul>

      <h2>Veterinary Care</h2>
      <p>Regular veterinary checkups are essential:</p>
      <ul>
        <li><strong>Annual checkups:</strong> At least once per year</li>
        <li><strong>New bird exam:</strong> Within 48 hours of bringing home a new parrot</li>
        <li><strong>Emergency care:</strong> Know your nearest avian veterinarian</li>
      </ul>

      <h2>Grooming</h2>
      <p><strong>Bathing:</strong> Most parrots enjoy bathing. Provide a shallow dish of water or mist them with a spray bottle 2-3 times per week.</p>

      <p><strong>Nail Trimming:</strong> May be needed every 4-6 weeks. Consult your veterinarian for proper technique.</p>

      <p><strong>Beak Care:</strong> Usually maintained naturally through chewing and play. Provide appropriate toys and perches.</p>

      <h2>Conclusion</h2>
      <p>Proper parrot care requires commitment, knowledge, and love. By following these guidelines and staying attentive to your parrot's needs, you'll provide them with a happy, healthy life. Remember, each parrot is unique, so adapt these guidelines to your specific bird's needs and always consult with an avian veterinarian for specific concerns.</p>
    `,
    image: "https://images.pexels.com/photos/1427447/pexels-photo-1427447.jpeg",
    publishedAt: "2024-01-20",
    author: "Global Parrot Center Team",
    tags: ["Care", "Health", "Nutrition"]
  },
  {
    id: 5,
    title: "Parrot Health & Wellness Guide",
    slug: "health-wellness",
    excerpt: "Learn how to maintain your parrot's health and recognize signs of illness early.",
    content: `
      <h2>Introduction</h2>
      <p>Maintaining your parrot's health requires vigilance, proper care, and understanding of common health issues. Early detection of problems can save your parrot's life.</p>

      <h2>Preventive Health Care</h2>
      <p><strong>Regular Veterinary Visits:</strong></p>
      <ul>
        <li>Annual wellness exams</li>
        <li>Fecal testing for parasites</li>
        <li>Blood work for baseline health</li>
        <li>Weight monitoring</li>
      </ul>

      <p><strong>Vaccinations:</strong> Discuss with your avian veterinarian which vaccinations are recommended for your area and parrot species.</p>

      <h2>Common Health Issues</h2>
      
      <h3>Respiratory Problems</h3>
      <p><strong>Symptoms:</strong></p>
      <ul>
        <li>Wheezing or clicking sounds when breathing</li>
        <li>Discharge from nostrils</li>
        <li>Open-mouth breathing</li>
        <li>Tail bobbing</li>
      </ul>
      <p><strong>Prevention:</strong> Avoid drafts, maintain proper humidity, keep cage clean, avoid smoking around birds.</p>

      <h3>Feather Problems</h3>
      <p><strong>Feather Plucking:</strong> Can indicate stress, boredom, illness, or skin irritation. Requires veterinary evaluation.</p>
      <p><strong>Poor Feather Quality:</strong> May indicate nutritional deficiencies or illness.</p>

      <h3>Digestive Issues</h3>
      <p><strong>Symptoms:</strong></p>
      <ul>
        <li>Changes in droppings (color, consistency, frequency)</li>
        <li>Regurgitation</li>
        <li>Loss of appetite</li>
        <li>Weight loss</li>
      </ul>

      <h3>Parasites</h3>
      <p>Watch for mites, lice, or internal parasites. Regular veterinary checkups help detect these early.</p>

      <h2>Emergency Situations</h2>
      <p><strong>Seek immediate veterinary care if your parrot:</strong></p>
      <ul>
        <li>Is bleeding</li>
        <li>Has difficulty breathing</li>
        <li>Is unconscious or unresponsive</li>
        <li>Has been injured</li>
        <li>Has ingested something toxic</li>
        <li>Shows sudden severe behavior changes</li>
      </ul>

      <h2>First Aid Kit</h2>
      <p>Keep a basic first aid kit for your parrot:</p>
      <ul>
        <li>Styptic powder (for nail bleeding)</li>
        <li>Saline solution</li>
        <li>Gauze pads</li>
        <li>Small towel for restraint</li>
        <li>Contact information for your avian veterinarian</li>
      </ul>

      <h2>Mental Health</h2>
      <p>Parrots can suffer from stress, depression, and anxiety:</p>
      <ul>
        <li>Provide adequate mental stimulation</li>
        <li>Ensure proper social interaction</li>
        <li>Maintain consistent routines</li>
        <li>Watch for signs of stress (feather plucking, aggression, lethargy)</li>
      </ul>

      <h2>Weight Management</h2>
      <p>Regular weight monitoring helps detect health issues early:</p>
      <ul>
        <li>Weigh your parrot weekly at the same time of day</li>
        <li>Keep a weight log</li>
        <li>Sudden weight changes may indicate illness</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Your parrot's health depends on preventive care, early detection of problems, and prompt veterinary attention. Stay observant, maintain regular checkups, and don't hesitate to consult your veterinarian with any concerns.</p>
    `,
    image: "https://images.pexels.com/photos/1438130/pexels-photo-1438130.jpeg",
    publishedAt: "2024-01-18",
    author: "Global Parrot Center Team",
    tags: ["Health", "Wellness", "Care"]
  },
  {
    id: 6,
    title: "Parrot Breeding Basics",
    slug: "breeding",
    excerpt: "Essential information for responsible parrot breeding practices.",
    content: `
      <h2>Introduction</h2>
      <p>Breeding parrots is a serious commitment that requires extensive knowledge, proper facilities, and dedication. This guide covers the basics of responsible parrot breeding.</p>

      <h2>Before You Begin</h2>
      <p><strong>Considerations:</strong></p>
      <ul>
        <li>Do you have adequate space and facilities?</li>
        <li>Can you care for multiple birds and potential offspring?</li>
        <li>Do you have knowledge of genetics and breeding practices?</li>
        <li>Are you prepared for potential complications?</li>
        <li>Do you have homes lined up for potential offspring?</li>
      </ul>

      <h2>Pair Selection</h2>
      <p><strong>Choosing Breeding Pairs:</strong></p>
      <ul>
        <li>Select healthy, unrelated birds</li>
        <li>Ensure both birds are of breeding age (varies by species)</li>
        <li>Choose birds with good temperaments</li>
        <li>Consider genetic diversity</li>
        <li>Ensure both birds are in optimal health</li>
      </ul>

      <h2>Breeding Environment</h2>
      <p><strong>Nesting Requirements:</strong></p>
      <ul>
        <li>Appropriate nesting box size for the species</li>
        <li>Proper nesting material</li>
        <li>Privacy and quiet location</li>
        <li>Optimal temperature and humidity</li>
        <li>Security from predators and disturbances</li>
      </ul>

      <h2>Breeding Process</h2>
      <p><strong>Pre-Breeding:</strong></p>
      <ul>
        <li>Ensure both birds are in peak health</li>
        <li>Provide optimal nutrition</li>
        <li>Gradually increase daylight hours (if applicable)</li>
        <li>Monitor for breeding behaviors</li>
      </ul>

      <p><strong>During Breeding:</strong></p>
      <ul>
        <li>Monitor the pair closely</li>
        <li>Provide extra nutrition for the female</li>
        <li>Minimize disturbances</li>
        <li>Watch for signs of aggression between pair</li>
      </ul>

      <h2>Egg Incubation</h2>
      <p><strong>Natural Incubation:</strong> Most parrots incubate their own eggs. Provide a stable environment and monitor the nest.</p>

      <p><strong>Artificial Incubation:</strong> Requires specialized equipment and knowledge. Consult experienced breeders.</p>

      <h2>Chick Care</h2>
      <p><strong>Hand-Feeding:</strong> If necessary, requires proper technique and equipment. Improper hand-feeding can be fatal.</p>

      <p><strong>Weaning:</strong> Gradual process that varies by species. Monitor weight and health closely.</p>

      <h2>Legal and Ethical Considerations</h2>
      <ul>
        <li>Check local regulations regarding breeding</li>
        <li>Ensure proper documentation</li>
        <li>Only breed healthy, unrelated birds</li>
        <li>Have homes prepared for all potential offspring</li>
        <li>Consider the welfare of the birds above all</li>
      </ul>

      <h2>Common Challenges</h2>
      <ul>
        <li>Infertile eggs</li>
        <li>Parental rejection</li>
        <li>Health complications</li>
        <li>Aggression between breeding pairs</li>
        <li>Chick mortality</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Breeding parrots should only be undertaken by experienced individuals with proper facilities and knowledge. Always prioritize the health and welfare of the birds. Consider working with an experienced mentor before attempting to breed.</p>
    `,
    image: "https://images.pexels.com/photos/1316294/pexels-photo-1316294.jpeg",
    publishedAt: "2024-01-12",
    author: "Global Parrot Center Team",
    tags: ["Breeding", "Care", "Advanced"]
  },
  {
    id: 7,
    title: "Parrot Nutrition Guide",
    slug: "nutrition",
    excerpt: "Learn about proper nutrition and feeding practices for healthy parrots.",
    content: `
      <h2>Introduction</h2>
      <p>Proper nutrition is fundamental to your parrot's health, longevity, and quality of life. Understanding what to feed and how to feed your parrot is essential for responsible ownership.</p>

      <h2>Core Diet Components</h2>
      
      <h3>Pellets (60-70% of diet)</h3>
      <p>High-quality commercial pellets should form the foundation of your parrot's diet:</p>
      <ul>
        <li>Choose pellets specifically formulated for your parrot's size</li>
        <li>Look for pellets without artificial colors or preservatives</li>
        <li>Ensure pellets are fresh and stored properly</li>
        <li>Gradually transition from seeds to pellets if needed</li>
      </ul>

      <h3>Fresh Vegetables (20-25% of diet)</h3>
      <p><strong>Recommended vegetables:</strong></p>
      <ul>
        <li>Dark leafy greens (kale, spinach, collard greens)</li>
        <li>Carrots (great source of vitamin A)</li>
        <li>Bell peppers (all colors)</li>
        <li>Broccoli and cauliflower</li>
        <li>Squash and sweet potatoes</li>
        <li>Green beans</li>
      </ul>

      <h3>Fresh Fruits (5-10% of diet)</h3>
      <p><strong>Recommended fruits:</strong></p>
      <ul>
        <li>Berries (blueberries, strawberries, raspberries)</li>
        <li>Apples (remove seeds)</li>
        <li>Melons</li>
        <li>Mangoes</li>
        <li>Papayas</li>
        <li>Grapes (in moderation)</li>
      </ul>

      <h3>Seeds and Nuts (5-10% - treats only)</h3>
      <p>Seeds and nuts are high in fat and should be limited:</p>
      <ul>
        <li>Use as training rewards</li>
        <li>Offer in small quantities</li>
        <li>Choose unsalted, raw varieties</li>
      </ul>

      <h2>Foods to Avoid</h2>
      <p><strong>Toxic Foods:</strong></p>
      <ul>
        <li><strong>Avocado:</strong> Contains persin, which is toxic to birds</li>
        <li><strong>Chocolate:</strong> Contains theobromine, toxic to birds</li>
        <li><strong>Caffeine:</strong> Can cause cardiac issues</li>
        <li><strong>Alcohol:</strong> Extremely toxic</li>
        <li><strong>Onions and Garlic:</strong> Can cause digestive issues</li>
        <li><strong>Apple Seeds:</strong> Contain cyanide</li>
        <li><strong>High-Salt Foods:</strong> Can cause dehydration and kidney issues</li>
        <li><strong>High-Fat Foods:</strong> Can lead to obesity and health problems</li>
      </ul>

      <h2>Feeding Schedule</h2>
      <p><strong>Daily Routine:</strong></p>
      <ul>
        <li><strong>Morning:</strong> Fresh pellets and water</li>
        <li><strong>Midday:</strong> Fresh vegetables and fruits</li>
        <li><strong>Evening:</strong> Remove uneaten fresh food, ensure pellets available</li>
      </ul>

      <h2>Water</h2>
      <p>Fresh, clean water should always be available:</p>
      <ul>
        <li>Change water at least twice daily</li>
        <li>Use clean, filtered water when possible</li>
        <li>Clean water dishes thoroughly</li>
        <li>Monitor water consumption (changes may indicate illness)</li>
      </ul>

      <h2>Supplements</h2>
      <p>Most parrots on a balanced diet don't need supplements. However:</p>
      <ul>
        <li>Consult your veterinarian before adding supplements</li>
        <li>Calcium may be needed for breeding females</li>
        <li>Vitamin D may be needed if limited sunlight exposure</li>
      </ul>

      <h2>Special Dietary Considerations</h2>
      <p><strong>Breeding Birds:</strong> May need increased protein and calcium</p>
      <p><strong>Young Birds:</strong> May need more frequent feedings</p>
      <p><strong>Senior Birds:</strong> May need adjusted diet based on health conditions</p>
      <p><strong>Ill Birds:</strong> May require special diets prescribed by veterinarian</p>

      <h2>Transitioning to a New Diet</h2>
      <p>If changing your parrot's diet:</p>
      <ul>
        <li>Make changes gradually over 2-4 weeks</li>
        <li>Mix new food with old food</li>
        <li>Monitor weight and health closely</li>
        <li>Be patient - some parrots are resistant to change</li>
      </ul>

      <h2>Conclusion</h2>
      <p>A balanced, varied diet is essential for your parrot's health. Focus on high-quality pellets supplemented with fresh vegetables and fruits, limit seeds and nuts, and always avoid toxic foods. When in doubt, consult with an avian veterinarian or certified avian nutritionist.</p>
    `,
    image: "https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg",
    publishedAt: "2024-01-14",
    author: "Global Parrot Center Team",
    tags: ["Nutrition", "Health", "Care"]
  },
  {
    id: 8,
    title: "Parrot Safety Guide",
    slug: "safety",
    excerpt: "Essential safety tips to protect your parrot from common household hazards.",
    content: `
      <h2>Introduction</h2>
      <p>Your home contains many potential hazards for parrots. Understanding and eliminating these dangers is crucial for keeping your feathered friend safe.</p>

      <h2>Household Hazards</h2>
      
      <h3>Toxic Substances</h3>
      <p><strong>Keep away from parrots:</strong></p>
      <ul>
        <li>Cleaning products (bleach, ammonia, etc.)</li>
        <li>Pesticides and insecticides</li>
        <li>Non-stick cookware fumes (Teflon, when overheated)</li>
        <li>Air fresheners and scented candles</li>
        <li>Smoke (cigarette, fireplace, etc.)</li>
        <li>Essential oils (many are toxic)</li>
        <li>Lead (old paint, weights, etc.)</li>
        <li>Zinc (galvanized metal)</li>
      </ul>

      <h3>Dangerous Foods</h3>
      <p>Always avoid feeding:</p>
      <ul>
        <li>Avocado</li>
        <li>Chocolate</li>
        <li>Caffeine</li>
        <li>Alcohol</li>
        <li>Onions and garlic</li>
        <li>Apple seeds</li>
        <li>High-salt or high-fat foods</li>
      </ul>

      <h2>Physical Hazards</h2>
      
      <h3>Windows and Mirrors</h3>
      <ul>
        <li>Keep windows closed or use screens</li>
        <li>Cover mirrors when bird is out</li>
        <li>Use window decals to prevent collisions</li>
      </ul>

      <h3>Ceiling Fans</h3>
      <p>Always turn off ceiling fans when your parrot is out of the cage.</p>

      <h3>Open Water</h3>
      <ul>
        <li>Keep toilet lids closed</li>
        <li>Cover open containers of water</li>
        <li>Supervise around pools or bathtubs</li>
      </ul>

      <h3>Electrical Cords</h3>
      <ul>
        <li>Cover or hide electrical cords</li>
        <li>Use cord protectors</li>
        <li>Supervise closely around cords</li>
      </ul>

      <h2>Other Pets</h2>
      <p><strong>Safety with other animals:</strong></p>
      <ul>
        <li>Never leave parrots unsupervised with dogs or cats</li>
        <li>Even friendly pets can accidentally injure birds</li>
        <li>Introduce slowly and carefully</li>
        <li>Always supervise interactions</li>
      </ul>

      <h2>Escape Prevention</h2>
      <ul>
        <li>Ensure all doors and windows are closed before letting bird out</li>
        <li>Check for gaps in window screens</li>
        <li>Consider wing clipping (discuss with veterinarian)</li>
        <li>Train recall commands</li>
        <li>Use identification (leg bands or microchips)</li>
      </ul>

      <h2>Travel Safety</h2>
      <p><strong>When traveling with your parrot:</strong></p>
      <ul>
        <li>Use a secure travel cage</li>
        <li>Never leave bird in hot car</li>
        <li>Ensure proper ventilation</li>
        <li>Bring familiar items and food</li>
        <li>Research pet-friendly accommodations</li>
      </ul>

      <h2>Emergency Preparedness</h2>
      <ul>
        <li>Keep emergency contact numbers handy</li>
        <li>Know location of nearest avian veterinarian</li>
        <li>Have a first aid kit prepared</li>
        <li>Plan for evacuation scenarios</li>
        <li>Keep important documents accessible</li>
      </ul>

      <h2>Child Safety</h2>
      <p><strong>When children interact with parrots:</strong></p>
      <ul>
        <li>Always supervise interactions</li>
        <li>Teach children to be gentle</li>
        <li>Show proper handling techniques</li>
        <li>Respect the bird's boundaries</li>
        <li>Wash hands before and after handling</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Creating a safe environment for your parrot requires constant vigilance and awareness. Regularly assess your home for potential hazards, stay informed about toxic substances, and always prioritize your parrot's safety. When in doubt, err on the side of caution.</p>
    `,
    image: "https://images.pexels.com/photos/1040397/pexels-photo-1040397.jpeg",
    publishedAt: "2024-01-08",
    author: "Global Parrot Center Team",
    tags: ["Safety", "Care", "Health"]
  },
  {
    id: 9,
    title: "Age Recommendations for Parrot Ownership",
    slug: "age-recommendations",
    excerpt: "Understanding age-appropriate parrot species and care requirements for different age groups.",
    content: `
      <h2>Introduction</h2>
      <p>Different parrot species have different care requirements and temperaments, making some more suitable for certain age groups. This guide helps match parrot species with appropriate age groups.</p>

      <h2>Parrots for Children 10+ (with adult supervision)</h2>
      <p><strong>Recommended Species:</strong></p>
      <ul>
        <li><strong>Budgies (Parakeets):</strong> Small, gentle, and relatively easy to care for</li>
        <li><strong>Cockatiels:</strong> Friendly and less demanding than larger species</li>
        <li><strong>Canaries:</strong> Beautiful singers, less hands-on interaction needed</li>
        <li><strong>Finches:</strong> Small, social, good for observation</li>
      </ul>

      <p><strong>Why these species:</strong></p>
      <ul>
        <li>Smaller size reduces risk of serious injury</li>
        <li>Generally more forgiving of handling mistakes</li>
        <li>Lower maintenance requirements</li>
        <li>Less expensive to care for</li>
      </ul>

      <p><strong>Important Notes:</strong></p>
      <ul>
        <li>Adult supervision is essential</li>
        <li>Children should be taught proper handling</li>
        <li>Parents must be primary caregivers</li>
        <li>Regular veterinary care is still required</li>
      </ul>

      <h2>Parrots for Teens 12-15 (with adult guidance)</h2>
      <p><strong>Recommended Species:</strong></p>
      <ul>
        <li><strong>Conures:</strong> Playful and social</li>
        <li><strong>Lovebirds:</strong> Affectionate but can be nippy</li>
        <li><strong>Quakers:</strong> Intelligent and trainable</li>
        <li><strong>Pionus:</strong> Calmer medium-sized parrots</li>
      </ul>

      <p><strong>Considerations:</strong></p>
      <ul>
        <li>Teens can take more responsibility</li>
        <li>Still require adult oversight</li>
        <li>More complex care requirements</li>
        <li>Longer lifespan commitment</li>
      </ul>

      <h2>Parrots for Ages 14+ or Adult Owners</h2>
      <p><strong>Recommended Species:</strong></p>
      <ul>
        <li><strong>African Greys:</strong> Highly intelligent, require experienced owners</li>
        <li><strong>Amazons:</strong> Social but can be loud</li>
        <li><strong>Eclectus:</strong> Beautiful, require specialized diet</li>
        <li><strong>Caiques:</strong> Energetic and playful</li>
      </ul>

      <h2>Parrots for Ages 16+ or Experienced Adult Owners</h2>
      <p><strong>Recommended Species:</strong></p>
      <ul>
        <li><strong>Macaws:</strong> Large, intelligent, require extensive space and time</li>
        <li><strong>Cockatoos:</strong> Very demanding, require constant attention</li>
        <li><strong>Large Amazons:</strong> Can be aggressive if not properly trained</li>
        <li><strong>Hyacinth Macaws:</strong> Largest parrots, very expensive and demanding</li>
      </ul>

      <p><strong>Why these require experience:</strong></p>
      <ul>
        <li>Powerful beaks can cause serious injury</li>
        <li>Extensive space requirements</li>
        <li>High maintenance needs (3-4 hours daily interaction)</li>
        <li>Long lifespans (50-80 years)</li>
        <li>Complex behavioral needs</li>
        <li>Significant financial commitment</li>
      </ul>

      <h2>Factors to Consider Beyond Age</h2>
      <ul>
        <li><strong>Maturity level:</strong> More important than chronological age</li>
        <li><strong>Family situation:</strong> Who will be primary caregiver?</li>
        <li><strong>Living situation:</strong> Space, noise tolerance, neighbors</li>
        <li><strong>Time commitment:</strong> Can vary from 1-4 hours daily</li>
        <li><strong>Financial resources:</strong> Initial and ongoing costs</li>
        <li><strong>Long-term commitment:</strong> Parrots live 10-80 years</li>
      </ul>

      <h2>Teaching Children About Parrot Care</h2>
      <p><strong>Age-appropriate responsibilities:</strong></p>
      <ul>
        <li><strong>Ages 5-8:</strong> Observing, learning about parrots</li>
        <li><strong>Ages 8-10:</strong> Helping with feeding (supervised)</li>
        <li><strong>Ages 10-12:</strong> Basic care tasks with supervision</li>
        <li><strong>Ages 12+:</strong> More independent care, still with oversight</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Choosing the right parrot for your family's age group is crucial for both the bird's welfare and your family's experience. Always prioritize the parrot's needs and ensure that an adult is ultimately responsible for the bird's care, regardless of the child's age. When in doubt, start with a smaller, more manageable species and work your way up as experience grows.</p>
    `,
    image: "https://images.pexels.com/photos/1430567/pexels-photo-1430567.jpeg",
    publishedAt: "2024-01-22",
    author: "Global Parrot Center Team",
    tags: ["Age Recommendations", "Family", "Care"]
  }
];

