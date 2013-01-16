/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"KjGlV6twgVHvofyu0OfCXCssFr03I3HS"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"Ea7TTDe5WUJJIcw6DbPWzxVolQmrtbg7"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"BdakzCkXGhRZr6vigPUHJezMk69m26gq"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"zVAFoHf55Clf3wk1UoqT2q698tsut4nD"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"3VC2hBqxvYIUOoGGi6t0uhuWPrpXc4js"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"oSLQqLYHwrqm9J4hKKNb1IgfYlrKVFo3"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
