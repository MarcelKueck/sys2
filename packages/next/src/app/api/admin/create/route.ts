import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, adminSecret } = await request.json();
    
    // Check admin secret
    if (adminSecret !== "ADMIN_SECRET_2024") {
      return NextResponse.json({ error: "Invalid admin secret" }, { status: 401 });
    }
    
    const supabase = await createClient();
    
    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }
    
    if (authData.user) {
          // Create or update the user's profile with admin role
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ 
        id: authData.user.id,
        email: authData.user.email,
        role: "admin",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error("Profile upsert error:", profileError);
      return NextResponse.json({ error: "Failed to create/update profile" }, { status: 500 });
    }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Admin user created successfully",
      user: authData.user 
    });
    
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
