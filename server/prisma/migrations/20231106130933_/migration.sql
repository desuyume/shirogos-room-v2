-- CreateEnum
CREATE TYPE "UniqueRoleType" AS ENUM ('ADJECTIVES', 'NOUNS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "donates" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "amount" DOUBLE PRECISION DEFAULT 0,
    "gifts" TEXT DEFAULT '',

    CONSTRAINT "donates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unique_roles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "UniqueRoleType" NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "unique_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "panopticons" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,

    CONSTRAINT "panopticons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "birthday" TIMESTAMP(3),
    "dangos" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "panopticons" INTEGER NOT NULL DEFAULT 0,
    "games_ordered" INTEGER NOT NULL DEFAULT 0,
    "viewing_ordered" INTEGER NOT NULL DEFAULT 0,
    "clips" INTEGER NOT NULL DEFAULT 0,
    "legendary_exams" INTEGER NOT NULL DEFAULT 0,
    "fraction_tournaments" INTEGER NOT NULL DEFAULT 0,
    "profile_img" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "twitchId" INTEGER NOT NULL,
    "discordId" INTEGER,
    "vkId" INTEGER,
    "telegramId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "past_usernames" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "past_usernames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_backgrounds" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,

    CONSTRAINT "room_backgrounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_colors" TEXT[] DEFAULT ARRAY['pink']::TEXT[],
    "active_room_color" TEXT NOT NULL DEFAULT 'pink',
    "username_colors" TEXT[] DEFAULT ARRAY['pink']::TEXT[],
    "active_username_color" TEXT NOT NULL DEFAULT 'pink',
    "selected_unique_role_adjective" TEXT,
    "selected_unique_role_noun" TEXT,
    "characterId" INTEGER,
    "roomBackgroundId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackroundsOnRooms" (
    "roomId" INTEGER NOT NULL,
    "roomBackgroundId" INTEGER NOT NULL,

    CONSTRAINT "BackroundsOnRooms_pkey" PRIMARY KEY ("roomId","roomBackgroundId")
);

-- CreateTable
CREATE TABLE "room_colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "room_colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "username_colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "username_colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniqueRolesOnRooms" (
    "roomId" INTEGER NOT NULL,
    "uniqueRoleId" INTEGER NOT NULL,

    CONSTRAINT "UniqueRolesOnRooms_pkey" PRIMARY KEY ("roomId","uniqueRoleId")
);

-- CreateTable
CREATE TABLE "twitch_profiles" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "twitch_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord_profiles" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "discord_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vk_profiles" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "vk_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegram_profiles" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "telegram_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderTypeId" INTEGER NOT NULL,
    "orderText" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "orderPriceId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "orderRules" TEXT,

    CONSTRAINT "order_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_prices" (
    "id" SERIAL NOT NULL,
    "orderTypeId" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "order_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "online_options" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "online_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "birthday_awards" (
    "id" SERIAL NOT NULL,
    "award" INTEGER NOT NULL,

    CONSTRAINT "birthday_awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "news_img" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chronicles" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,

    CONSTRAINT "chronicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chronicle_events" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "prefix" TEXT,
    "text" TEXT,
    "img" TEXT,
    "chronicleId" INTEGER,

    CONSTRAINT "chronicle_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subTitle" TEXT,
    "subSubTitle" TEXT,
    "category" TEXT,
    "original_img" TEXT,
    "miniature_img" TEXT,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_descriptions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER,

    CONSTRAINT "character_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_characteristics" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "characteristic" TEXT NOT NULL,
    "characterId" INTEGER,

    CONSTRAINT "character_characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_roles_title_key" ON "unique_roles"("title");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_twitchId_key" ON "users"("twitchId");

-- CreateIndex
CREATE UNIQUE INDEX "users_discordId_key" ON "users"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "users_vkId_key" ON "users"("vkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_accessToken_key" ON "tokens"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_refreshToken_key" ON "tokens"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_userId_key" ON "rooms"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "room_colors_name_key" ON "room_colors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "room_colors_hex_key" ON "room_colors"("hex");

-- CreateIndex
CREATE UNIQUE INDEX "username_colors_name_key" ON "username_colors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "username_colors_hex_key" ON "username_colors"("hex");

-- CreateIndex
CREATE UNIQUE INDEX "order_types_type_key" ON "order_types"("type");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_twitchId_fkey" FOREIGN KEY ("twitchId") REFERENCES "twitch_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "discord_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_vkId_fkey" FOREIGN KEY ("vkId") REFERENCES "vk_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "telegram_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "past_usernames" ADD CONSTRAINT "past_usernames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_roomBackgroundId_fkey" FOREIGN KEY ("roomBackgroundId") REFERENCES "room_backgrounds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackroundsOnRooms" ADD CONSTRAINT "BackroundsOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackroundsOnRooms" ADD CONSTRAINT "BackroundsOnRooms_roomBackgroundId_fkey" FOREIGN KEY ("roomBackgroundId") REFERENCES "room_backgrounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniqueRolesOnRooms" ADD CONSTRAINT "UniqueRolesOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniqueRolesOnRooms" ADD CONSTRAINT "UniqueRolesOnRooms_uniqueRoleId_fkey" FOREIGN KEY ("uniqueRoleId") REFERENCES "unique_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderTypeId_fkey" FOREIGN KEY ("orderTypeId") REFERENCES "order_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderPriceId_fkey" FOREIGN KEY ("orderPriceId") REFERENCES "order_prices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_prices" ADD CONSTRAINT "order_prices_orderTypeId_fkey" FOREIGN KEY ("orderTypeId") REFERENCES "order_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chronicle_events" ADD CONSTRAINT "chronicle_events_chronicleId_fkey" FOREIGN KEY ("chronicleId") REFERENCES "chronicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_descriptions" ADD CONSTRAINT "character_descriptions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_characteristics" ADD CONSTRAINT "character_characteristics_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
