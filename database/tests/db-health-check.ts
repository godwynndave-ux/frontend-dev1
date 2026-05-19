import { PrismaClient } from "@prisma/client";
import { MatchService } from "../../apps/api/src/modules/match/match.service";

const prisma = new PrismaClient();
const matchService = new MatchService();

async function runTest() {
  console.log("\n🧪 STACKFORGE DB TEST STARTED\n");

  try {
    // 1. Create test users
    const userA = await prisma.user.create({
      data: {
        email: `a_${Date.now()}@test.com`,
        username: `userA_${Date.now()}`,
        passwordHash: "testhash",
      },
    });

    const userB = await prisma.user.create({
      data: {
        email: `b_${Date.now()}@test.com`,
        username: `userB_${Date.now()}`,
        passwordHash: "testhash",
      },
    });

    console.log("✅ Users created");

    await prisma.swipe.create({
  data: {
    senderId: userA.id,
    receiverId: userB.id,
    type: "RIGHT",
  },
});

await prisma.swipe.create({
  data: {
    senderId: userB.id,
    receiverId: userA.id,
    type: "RIGHT",
  },
});

// 🔥 THIS IS THE MISSING PIECE
const match = await matchService.checkAndCreateMatch(
  userA.id,
  userB.id
);

    if (!match) {
      throw new Error("❌ MATCH NOT CREATED — swipe logic broken");
    }

    console.log("🎉 MATCH CREATED SUCCESSFULLY");

    // 5. Check conversation auto creation (optional logic test)
    const conversation = await prisma.conversation.findFirst({
      where: { matchId: match.id },
    });

    if (conversation) {
      console.log("💬 Conversation exists");
    } else {
      console.log("⚠️ No conversation yet (expected if not auto-created)");
    }

    // 6. Cleanup (IMPORTANT)
    await prisma.message.deleteMany({});
    await prisma.conversation.deleteMany({});
    await prisma.match.deleteMany({
      where: {
        id: match.id,
      },
    });

    await prisma.swipe.deleteMany({
      where: {
        OR: [
          { senderId: userA.id },
          { senderId: userB.id },
        ],
      },
    });

    await prisma.user.deleteMany({
      where: {
        id: {
          in: [userA.id, userB.id],
        },
      },
    });

    console.log("🧹 Cleanup complete");
    console.log("\n✅ TEST PASSED\n");
  } catch (err) {
    console.error("\n❌ TEST FAILED\n", err);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
