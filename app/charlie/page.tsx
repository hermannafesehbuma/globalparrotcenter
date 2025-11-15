"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Calendar, Heart, Users, MessageSquare } from "lucide-react";

export default function CharlieStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 dark:from-pink-950/20 dark:via-background dark:to-pink-950/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <Card className="overflow-hidden mb-8">
            <div className="relative h-96 w-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl">🦜</span>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Featured Parrot</Badge>
              </div>
              <CardTitle className="text-4xl">Charlie the African Grey</CardTitle>
              <CardDescription className="text-lg">
                This week&apos;s spotlight parrot
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Story Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">A Home Found, A Family Complete</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Charlie is a remarkable 5-year-old African Grey parrot who has found his forever home 
                with the Johnson family. This is the heartwarming story of how Charlie transformed 
                from a shy, reserved bird into a beloved member of the family, becoming one of the 
                most talkative and intelligent parrots in our community.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">The Journey Begins</h2>
              <p className="text-lg text-muted-foreground mb-4">
                When the Johnsons first met Charlie at Global Parrot Center, he was just 2 years old 
                and had been looking for a home for several months. African Greys are known for their 
                intelligence and sensitivity, and Charlie was no exception. He was cautious around 
                new people and preferred to observe from the safety of his perch.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Sarah Johnson, a teacher with a passion for animals, immediately felt a connection 
                with Charlie. "There was something special about him," she recalls. "He looked at me 
                with such intelligence and curiosity. I knew he was the one."
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Building Trust and Bonding</h2>
              <p className="text-lg text-muted-foreground mb-4">
                The first few months were a period of adjustment. Charlie needed time to trust his 
                new family, and the Johnsons were patient. They spent hours sitting near his cage, 
                reading to him, and speaking softly. Gradually, Charlie began to emerge from his shell.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                "It took about three months before he would step up on my hand willingly," Sarah 
                explains. "We used positive reinforcement with his favorite treats - walnuts and 
                sunflower seeds. Every small step felt like a huge victory."
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">A Vocabulary That Amazes</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Today, Charlie has an incredible vocabulary of over 200 words and phrases. But it&apos;s 
                not just about quantity - Charlie understands context. He greets family members by name, 
                asks for specific foods, and even tells jokes that make the family laugh.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                "He&apos;s developed his own personality," says Mike Johnson, Sarah&apos;s husband. "In the 
                morning, he&apos;ll say &apos;Good morning, Sarah! Coffee time!&apos; And if I&apos;m running late, 
                he&apos;ll actually say &apos;Hurry up, Mike!&apos; It&apos;s uncanny how much he understands."
              </p>
              <ul className="list-disc pl-6 text-lg text-muted-foreground mb-4 space-y-2">
                <li>Can identify all family members by name</li>
                <li>Asks for specific foods and activities</li>
                <li>Imitates household sounds (phone ringing, doorbell)</li>
                <li>Uses phrases appropriately in context</li>
                <li>Has learned to count to 10</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Gentle Nature and Family Life</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Despite his large size and powerful beak, Charlie has an incredibly gentle nature. 
                The Johnsons have two children - Emma (12) and Jake (10) - and Charlie interacts 
                with them beautifully. He&apos;s patient, curious, and has never shown any aggression.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                "Charlie loves when the kids read to him," Sarah shares. "He&apos;ll sit quietly on 
                his perch and listen intently. Sometimes he&apos;ll even repeat words from the story. 
                It&apos;s become part of our bedtime routine."
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Training and Enrichment</h2>
              <p className="text-lg text-muted-foreground mb-4">
                The Johnsons are committed to keeping Charlie mentally stimulated. Daily training 
                sessions, puzzle toys, and interactive games are part of Charlie&apos;s routine. 
                They&apos;ve taught him several tricks, including:
              </p>
              <ul className="list-disc pl-6 text-lg text-muted-foreground mb-4 space-y-2">
                <li>Retrieving objects on command</li>
                <li>Putting toys away in a basket</li>
                <li>Ring toss games</li>
                <li>Opening simple puzzle boxes</li>
                <li>Waving hello and goodbye</li>
              </ul>
              <p className="text-lg text-muted-foreground mb-4">
                "African Greys need mental stimulation," Sarah explains. "We treat training like 
                playtime, and Charlie absolutely loves it. It keeps his mind sharp and strengthens 
                our bond."
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Funny Moments and Personality</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Charlie has developed quite a sense of humor. He loves to mimic sounds around the 
                house and often uses them at the perfect moment. When the phone rings, he&apos;ll 
                answer it with "Hello?" before anyone can pick it up. He&apos;s also learned to 
                laugh at jokes, even when he doesn&apos;t quite understand them.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                One of the family&apos;s favorite memories is when Charlie learned the doorbell sound 
                and would ring it when he wanted attention. "We were so confused at first," Mike 
                laughs. "We kept checking the door, and no one was there. Then we realized it was 
                Charlie trying to get us to come play with him!"
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Community Involvement</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Sarah regularly shares updates about Charlie in our Global Parrot Center community. 
                Her posts about training progress, funny moments, and care tips have inspired many 
                other parrot owners. Charlie has become something of a local celebrity in our 
                community forum.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                "The community has been amazing," Sarah says. "When we first got Charlie, we had 
                so many questions, and everyone was so helpful. Now we love sharing our experiences 
                and helping new parrot owners. It&apos;s a wonderful community."
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Lessons Learned</h2>
              <p className="text-lg text-muted-foreground mb-4">
                The Johnsons want other families to know that African Greys require patience, 
                commitment, and understanding. "They&apos;re not like having a pet - they&apos;re 
                like having a toddler who lives for 50+ years," Sarah explains. "But the rewards 
                are immeasurable."
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Key advice they offer:
              </p>
              <ul className="list-disc pl-6 text-lg text-muted-foreground mb-4 space-y-2">
                <li>Be patient - trust takes time to build</li>
                <li>Invest in mental enrichment - these birds are incredibly intelligent</li>
                <li>Consistency is key in training</li>
                <li>Respect their moods and boundaries</li>
                <li>Make them part of the family, not just a pet in a cage</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">A Forever Friend</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Three years later, Charlie is a fully integrated member of the Johnson family. 
                He participates in family activities, has his own routine, and brings daily joy 
                and laughter to the household. The Johnsons can&apos;t imagine life without him.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                "Charlie has taught us so much about patience, communication, and the incredible 
                intelligence of these amazing creatures," Sarah reflects. "He&apos;s not just a pet - 
                he&apos;s part of our family. We&apos;re committed to giving him the best life possible 
                for the next 50+ years."
              </p>
            </section>

            {/* Stats Card */}
            <Card className="mb-8 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Charlie&apos;s Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Age</p>
                    <p className="text-lg">5 years old</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Species</p>
                    <p className="text-lg">African Grey</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Vocabulary</p>
                    <p className="text-lg">200+ words and phrases</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Home Since</p>
                    <p className="text-lg">2021</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Share Your Story
                </CardTitle>
                <CardDescription>
                  Have an amazing parrot story to share? Join our community!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button asChild>
                  <Link href="/community">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Join Community
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/products">
                    Explore Parrots
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

