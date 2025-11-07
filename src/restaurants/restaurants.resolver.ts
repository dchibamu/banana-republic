import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => [Restaurant])
  async restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation(() => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateRestaurent(
    @Args('input') updateRestaurantDto: UpdateRestaurantDto,
  ) {
    try {
      await this.restaurantService.udpateRestaurant(updateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
